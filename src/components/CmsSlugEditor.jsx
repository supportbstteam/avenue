"use client";

import { useEffect, useState } from "react";
import { TEMPLATE_REGISTRY } from "./templates/registry";
import RichTextInput from "./templates/blocks/RichTextInput";
import { useRouter } from "next/navigation";

export default function CmsSlugEditor({ slug }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slugInput, setSlugInput] = useState(slug || "");

  const [blocks, setBlocks] = useState([]);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= LOAD =================
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/cms/${slug}`);
      const { data } = await res.json();

      if (data) {
        setTitle(data.title || "");
        setSlugInput(data.slug || slug);

        // ⭐ Inject runtime ids
        const hydratedBlocks = (data.blocks || []).map((b) => ({
          id: crypto.randomUUID(),
          ...b,
        }));

        setBlocks(hydratedBlocks);
      }

      setLoading(false);
    }

    if (slug && slug !== "new") load();
    else setLoading(false);
  }, [slug]);

  // ================= SAVE =================
  const savePage = async () => {
    setSaving(true);
    setStatus("");

    const payload = {
      slug: slugInput,
      title,
      blocks: blocks.map(({ type, data }) => ({ type, data })),
    };

    await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    setStatus("Saved ✓");

    router.back();
    // ⭐ Redirect if slug changed
  };

  // ================= EDITOR =================

  const addBlock = (key) => {
    setBlocks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: key, data: {} },
    ]);
  };

  const removeBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const updateField = (id, field, value) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, data: { ...b.data, [field]: value } } : b
      )
    );
  };

  if (loading)
    return (
      <div className="flex justify-center p-20 text-gray-500">
        Loading CMS Editor...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24">
      {/* SAVE BAR */}
      <div className="sticky top-10 z-20 bg-white border rounded-xl mt-5 p-4 flex justify-between items-center shadow-sm">
        <div className="font-semibold text-lg">Editing: {slugInput}</div>

        <div className="flex items-center gap-4">
          {status && <div className="text-green-600 text-sm">{status}</div>}

          <button
            onClick={savePage}
            className="bg-teal-700 hover:bg-teal-800 cursor-pointer text-white px-6 py-2 rounded-lg"
          >
            {saving ? "Saving..." : "Save Page"}
          </button>
        </div>
      </div>

      {/* PAGE SETTINGS */}
      <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="font-bold text-xl">Page Settings</h2>

        <input
          placeholder="Page Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          placeholder="Slug"
          value={slugInput}
          onChange={(e) => setSlugInput(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* TEMPLATE PICKER */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <h2 className="font-bold mb-4 text-xl">Add Template Block</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(TEMPLATE_REGISTRY).map((tpl) => {
            const Preview = tpl.component;

            const previewData = {
              title: "Sample",
              subtitle: "Preview",
              image: "https://picsum.photos/400/200",
              text: "Preview text",
              content: "<p>Preview</p>",
              buttonText: "Click",
              link: "#",
              layout: "left",
              position: "top",
            };

            return (
              <div
                key={tpl.config.key}
                onClick={() => addBlock(tpl.config.key)}
                className="border rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition"
              >
                <div className="bg-gray-50 px-4 py-2 font-semibold text-sm">
                  {tpl.config.name}
                </div>

                <div className="p-3 h-[170px] overflow-hidden">
                  <div className="scale-[0.6] origin-top-left pointer-events-none">
                    <Preview {...previewData} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BLOCK EDITORS */}
      <div className="space-y-6">
        {blocks.map((block, index) => {
          const entry = TEMPLATE_REGISTRY[block.type];

          return (
            <div
              key={block.id}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between mb-4">
                <div className="font-semibold">
                  {index + 1}. {entry.config.name}
                </div>

                <button
                  onClick={() => removeBlock(block.id)}
                  className="text-red-500  cursor-pointer "
                >
                  Remove
                </button>
              </div>

              {entry.config.schema.map((field) => {
                const value = block.data[field.field] || "";

                if (field.type === "richtext")
                  return (
                    <RichTextInput
                      key={field.field}
                      value={value}
                      onChange={(v) => updateField(block.id, field.field, v)}
                    />
                  );

                if (field.type === "textarea")
                  return (
                    <textarea
                      key={field.field}
                      placeholder={field.label}
                      value={value}
                      onChange={(e) =>
                        updateField(block.id, field.field, e.target.value)
                      }
                      className="border p-2 rounded w-full mb-3"
                    />
                  );

                return (
                  <input
                    key={field.field}
                    placeholder={field.label}
                    value={value}
                    onChange={(e) =>
                      updateField(block.id, field.field, e.target.value)
                    }
                    className="border p-2 rounded w-full mb-3"
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* PREVIEW */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="font-bold text-xl mb-5">Page Preview</h2>

        <div className="border rounded-lg p-6 bg-gray-50">
          {blocks.map((block) => {
            const Comp = TEMPLATE_REGISTRY[block.type].component;

            return (
              <div key={block.id} className="mb-8">
                <Comp {...block.data} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

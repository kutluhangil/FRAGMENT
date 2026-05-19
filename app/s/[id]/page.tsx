import type { Metadata } from "next";

interface Props {
  params: { id: string };
  searchParams: Record<string, string>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "Shared Shader — FRAGMENT",
    description: "View and fork this GLSL shader on FRAGMENT",
    openGraph: {
      title: "Shared Shader — FRAGMENT",
      description: "View and fork this GLSL shader on FRAGMENT",
      type: "website",
    },
  };
}

export default function SharedShaderPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#ededf2] flex flex-col items-center justify-center p-6">
      <div className="max-w-lg text-center">
        <svg width="40" height="40" viewBox="0 0 22 22" fill="none" className="mx-auto mb-4">
          <polygon points="11,2 20,19 2,19" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinejoin="round"/>
          <polygon points="11,7 16.5,17 5.5,17" fill="#a78bfa" opacity="0.15"/>
        </svg>
        <h1 className="text-xl font-semibold mb-2">Shared Shader</h1>
        <p className="text-[#a0a0b0] text-sm mb-6">
          This shader was shared via FRAGMENT. Open it in the editor to view and fork it.
        </p>
        <a
          href={`/?share=${params.id}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#a78bfa] text-[#0a0a0f] text-sm font-medium rounded-lg hover:bg-[#b9a3fb] transition-colors"
        >
          Open in Editor
        </a>
      </div>
    </div>
  );
}

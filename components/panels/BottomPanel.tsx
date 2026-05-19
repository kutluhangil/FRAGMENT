"use client";
import { useRef, useCallback } from "react";
import {
  ChevronDown,
  Layers,
  SlidersHorizontal,
  Mic,
  Terminal,
} from "lucide-react";
import { useUIStore, type BottomTab } from "@/store/useUIStore";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { LayersPanel } from "./LayersPanel";
import { UniformsPanel } from "./UniformsPanel";
import { InputsPanel } from "./InputsPanel";
import { ConsolePanel } from "./ConsolePanel";
import { clamp } from "@/lib/utils/format";

const MIN_HEIGHT = 120;
const MAX_HEIGHT = 480;

const TAB_ICONS: Record<BottomTab, React.ReactNode> = {
  layers: <Layers size={12} />,
  uniforms: <SlidersHorizontal size={12} />,
  inputs: <Mic size={12} />,
  console: <Terminal size={12} />,
};

const TABS: Array<{ id: BottomTab; label: string }> = [
  { id: "console", label: "Console" },
  { id: "uniforms", label: "Uniforms" },
  { id: "layers", label: "Layers" },
  { id: "inputs", label: "Inputs" },
];

export function BottomPanel() {
  const {
    activeBottomTab,
    setActiveBottomTab,
    setBottomPanelHeight,
    bottomPanelHeight,
    toggleBottomPanel,
  } = useUIStore();

  const dragStartY = useRef<number | null>(null);
  const dragStartH = useRef<number>(bottomPanelHeight);

  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
      dragStartY.current = e.clientY;
      dragStartH.current = bottomPanelHeight;
      document.body.style.userSelect = "none";
      document.body.style.cursor = "row-resize";

      const onMove = (ev: MouseEvent) => {
        if (dragStartY.current === null) return;
        const delta = dragStartY.current - ev.clientY;
        setBottomPanelHeight(
          clamp(dragStartH.current + delta, MIN_HEIGHT, MAX_HEIGHT)
        );
      };

      const onUp = () => {
        dragStartY.current = null;
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [bottomPanelHeight, setBottomPanelHeight]
  );

  const tabs = TABS.map((t) => ({
    ...t,
    icon: TAB_ICONS[t.id],
  }));

  return (
    <div className="flex flex-col h-full bg-[var(--bg-elevated)]">
      {/* Drag handle */}
      <div
        className="h-1 w-full cursor-row-resize hover:bg-[var(--accent-dim)] transition-colors shrink-0 group"
        onMouseDown={onDragStart}
      >
        <div className="w-8 h-0.5 bg-[var(--border-strong)] group-hover:bg-[var(--accent)] rounded-full mx-auto mt-0.5 transition-colors" />
      </div>

      {/* Tab bar */}
      <div className="flex items-center justify-between h-9 px-2 border-b border-[var(--border-subtle)] shrink-0">
        <Tabs
          tabs={tabs}
          activeTab={activeBottomTab}
          onChange={(id) => setActiveBottomTab(id as BottomTab)}
        />
        <Tooltip content="Collapse panel">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleBottomPanel}
            aria-label="Collapse bottom panel"
          >
            <ChevronDown size={14} />
          </Button>
        </Tooltip>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-auto">
        {activeBottomTab === "console" && <ConsolePanel />}
        {activeBottomTab === "uniforms" && <UniformsPanel />}
        {activeBottomTab === "layers" && <LayersPanel />}
        {activeBottomTab === "inputs" && <InputsPanel />}
      </div>
    </div>
  );
}

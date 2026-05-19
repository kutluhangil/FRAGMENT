import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type BottomTab = "layers" | "uniforms" | "inputs" | "console";
export type SidebarTab = "library" | "my-shaders" | "gallery" | "docs";

interface UIState {
  sidebarOpen: boolean;
  bottomPanelOpen: boolean;
  bottomPanelHeight: number;
  activeBottomTab: BottomTab;
  activeSidebarTab: SidebarTab;
  commandPaletteOpen: boolean;
  aiModalOpen: boolean;
  exportModalOpen: boolean;
  shareModalOpen: boolean;
  settingsOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setBottomPanelOpen: (open: boolean) => void;
  toggleBottomPanel: () => void;
  setBottomPanelHeight: (height: number) => void;
  setActiveBottomTab: (tab: BottomTab) => void;
  setActiveSidebarTab: (tab: SidebarTab) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setAIModalOpen: (open: boolean) => void;
  setExportModalOpen: (open: boolean) => void;
  setShareModalOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      sidebarOpen: false,
      bottomPanelOpen: true,
      bottomPanelHeight: 200,
      activeBottomTab: "console",
      activeSidebarTab: "library",
      commandPaletteOpen: false,
      aiModalOpen: false,
      exportModalOpen: false,
      shareModalOpen: false,
      settingsOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setBottomPanelOpen: (open) => set({ bottomPanelOpen: open }),
      toggleBottomPanel: () =>
        set((s) => ({ bottomPanelOpen: !s.bottomPanelOpen })),
      setBottomPanelHeight: (height) => set({ bottomPanelHeight: height }),
      setActiveBottomTab: (tab) => set({ activeBottomTab: tab }),
      setActiveSidebarTab: (tab) => set({ activeSidebarTab: tab }),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      setAIModalOpen: (open) => set({ aiModalOpen: open }),
      setExportModalOpen: (open) => set({ exportModalOpen: open }),
      setShareModalOpen: (open) => set({ shareModalOpen: open }),
      setSettingsOpen: (open) => set({ settingsOpen: open }),
    }),
    { name: "ui-store" }
  )
);

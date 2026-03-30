"use client";

import { Icon } from "@iconify/react";
import { sections } from "../constants/data";

interface DocsSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
  activeSection: string;
  expandedSections: Set<string>;
  toggleSection: (id: string) => void;
  scrollTo: (id: string) => void;
  isActive: (id: string) => boolean | undefined;
}

export function DocsSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  activeSection,
  expandedSections,
  toggleSection,
  scrollTo,
  isActive,
}: DocsSidebarProps) {
  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#007cae] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#006080] transition"
        aria-label="Open docs navigation"
      >
        <Icon icon={isSidebarOpen ? "mdi:close" : "mdi:menu"} width={22} />
      </button>

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-20 sm:top-24 left-0 h-[calc(100vh-5rem)] overflow-y-auto
          w-64 bg-white border border-slate-200 rounded-r-2xl lg:rounded-2xl shadow-lg p-5 z-40
          transition-transform duration-300 lg:translate-x-0 shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex items-center gap-2 mb-6">
          <Icon
            icon="mdi:book-open-outline"
            className="text-[#007cae]"
            width={22}
          />
          <h2 className="text-lg font-extrabold text-slate-900">Docs</h2>
        </div>
        <nav className="space-y-1">
          {sections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => {
                  if (section.children) toggleSection(section.id);
                  scrollTo(section.id);
                }}
                className={`
                  w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2.5 text-sm
                  ${
                    isActive(section.id) && activeSection === section.id
                      ? "bg-[#007cae] text-white font-semibold"
                      : isActive(section.id)
                        ? "bg-[#007cae]/10 text-[#007cae] font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                <Icon icon={section.icon as string} width={16} className="shrink-0" />
                <span className="flex-1">{section.title}</span>
                {section.children && (
                  <Icon
                    icon={
                      expandedSections.has(section.id)
                        ? "mdi:chevron-up"
                        : "mdi:chevron-down"
                    }
                    width={14}
                    className="shrink-0 opacity-60"
                  />
                )}
              </button>

              {section.children && expandedSections.has(section.id) && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-100 pl-3">
                  {section.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => scrollTo(child.id)}
                      className={`
                        w-full text-left px-2 py-1.5 rounded-md text-xs transition-all
                        ${
                          activeSection === child.id
                            ? "text-[#007cae] font-bold"
                            : "text-slate-500 hover:text-slate-800"
                        }
                      `}
                    >
                      {child.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

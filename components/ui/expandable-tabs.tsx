"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ExpandableTabsItem {
  value: string;
  label: string;
  icon: ReactNode;
  href?: string;
}

interface ExpandableTabsProps {
  items: ExpandableTabsItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  className?: string;
}

interface ExpandableTabProps {
  item: ExpandableTabsItem;
  isActive: boolean;
  onSelect: (value: string) => void;
}

function ExpandableTab({ item, isActive, onSelect }: ExpandableTabProps) {
  const tabClassName =
    "relative z-10 flex shrink-0 cursor-pointer items-center rounded-[calc(var(--radius-2xl)-6px)] p-2 outline-none transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ring";

  const content = (
    <>
      {item.icon}
      <span
        className={cn(
          "grid transition-[grid-template-columns,opacity] duration-300 ease-out",
          isActive ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
        )}
      >
        <span className="min-w-0 overflow-hidden whitespace-nowrap font-medium text-foreground text-sm">
          <span className="block w-max pr-1 pl-2">{item.label}</span>
        </span>
      </span>
    </>
  );

  return (
    <Tooltip disabled={isActive}>
      <TooltipTrigger
        render={
          item.href ? (
            <a
              aria-current={isActive ? "page" : undefined}
              className={tabClassName}
              data-value={item.value}
              href={item.href}
            >
              {content}
            </a>
          ) : (
            <button
              aria-pressed={isActive}
              className={tabClassName}
              data-value={item.value}
              onClick={() => onSelect(item.value)}
              type="button"
            >
              {content}
            </button>
          )
        }
      />
      <TooltipContent>{item.label}</TooltipContent>
    </Tooltip>
  );
}

function useActivePill(activeValue: string | undefined) {
  const menuRef = useRef<HTMLMenuElement>(null);
  const [pill, setPill] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const measure = useCallback(() => {
    const menu = menuRef.current;
    if (!menu || activeValue === undefined) {
      setPill(null);
      return;
    }
    const active = menu.querySelector<HTMLElement>(
      `[data-value="${CSS.escape(activeValue)}"]`
    );
    if (!active) {
      setPill(null);
      return;
    }
    setPill({
      left: active.offsetLeft,
      top: active.offsetTop,
      width: active.offsetWidth,
      height: active.offsetHeight,
    });
  }, [activeValue]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) {
      return;
    }
    const observer = new ResizeObserver(measure);
    observer.observe(menu);
    for (const tab of menu.querySelectorAll("[data-value]")) {
      observer.observe(tab);
    }
    return () => observer.disconnect();
  }, [measure]);

  return { menuRef, pill };
}

export function ExpandableTabs({
  items,
  value,
  defaultValue,
  onValueChange,
  label = "Choose an option",
  className,
}: ExpandableTabsProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items[0]?.value
  );
  const activeValue = value ?? internalValue;
  const { menuRef, pill } = useActivePill(activeValue);

  const handleSelect = (next: string) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <div className="flex justify-center">
      <menu
        aria-label={label}
        className={cn(
          "relative m-0 flex max-w-full list-none items-center gap-1.5 overflow-x-auto overscroll-none rounded-2xl border bg-muted/50 p-1.5 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden",
          className
        )}
        ref={menuRef}
      >
        {pill && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute rounded-[calc(var(--radius-2xl)-6px)] bg-background shadow-sm ring-1 ring-border transition-[left,top,width,height] duration-300 ease-out"
            style={{
              left: pill.left,
              top: pill.top,
              width: pill.width,
              height: pill.height,
            }}
          />
        )}
        {items.map((item) => (
          <ExpandableTab
            isActive={item.value === activeValue}
            item={item}
            key={item.value}
            onSelect={handleSelect}
          />
        ))}
      </menu>
    </div>
  );
}

export type { ExpandableTabsItem, ExpandableTabsProps };

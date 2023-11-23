/* eslint-disable react/prop-types */
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/adapter/element";
import { Suspense, useEffect, useRef, useState } from "react";
import { cn } from "./cn";

export function JsxElementButton({ name, exportName, level }) {
  const ref = useRef(null);
  const [dragState, setDragState] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    return dropTargetForElements({
      canDrop: (args) => {
        return args.source.element !== ref.current;
      },
      element: ref.current,
      onDrag: () => {
        setDragState({ type: "make-child" });
      },
      onDragLeave: () => setDragState(false),
      onDrop: () => {
        setDragState(false);
      },
    });
  }, [exportName, level]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    return draggable({
      element: ref.current,
      getInitialData: () => ({
        exportName,
        level,
      }),
    });
  }, [exportName, level]);

  return (
    <div data-testid={`SceneElement(${name})`}>
      <Suspense>
        <button
          className="text-neutral-400 hover:bg-white/5 active:bg-white/10 group relative flex w-[274px] cursor-default items-center gap-1 border-l-2 border-transparent px-3 py-1.5 text-left text-sm -outline-offset-1"
          ref={ref}
          title={name}
        >
          {dragState && (
            <div
              className={cn([
                dragState.blocked
                  ? "border-red-400 outline-red-400"
                  : "border-blue-400 outline-blue-400",
                dragState.type === "make-child" && "outline",
                dragState.type === "move-before" && "border-t-2",
                dragState.type === "move-after" && "border-b-2",
                "absolute -bottom-0.5 -left-0.5 right-0 top-0 outline-2 -outline-offset-2 ",
              ])}
            />
          )}

          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </span>
        </button>
      </Suspense>
    </div>
  );
}

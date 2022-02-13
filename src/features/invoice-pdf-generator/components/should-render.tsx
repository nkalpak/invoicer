import React from "react";

interface IShouldRenderProps {
  condition: boolean;
  children: React.ReactNode | React.ReactNodeArray;
}

/*
 * PDF Renderer will crash when trying to read the "height" property
 * of an undefined node which is rendered inside a <View /> component.
 *
 * This makes the pattern of conditionally rendering components like
 * `some?.property && <Component />` unusable, because the conditional
 * render will yield undefined when `some?.property` yields undefined,
 * and thus will crash the renderer.
 *
 * So, using this component will prevent crashing the app.
 * */
export function ShouldRender({ condition, children }: IShouldRenderProps) {
  return condition ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <React.Fragment />
  );
}

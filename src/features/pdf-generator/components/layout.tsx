import React, { ComponentProps, PropsWithChildren } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import { ShouldRender } from "../../../components/should-render/should-render";
import { Spacer } from "./spacer";

const commonPdfStyles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
  },
});

type StyleProp = ComponentProps<typeof View>["style"];

type RowProps = PropsWithChildren<{ style?: StyleProp; gap?: number }>;

/*
 * Layout component which represents a single row with columns as children.
 *
 * Automatically assigns the correct `flex-basis` to all the children columns.
 * */
function Row({ children, style, gap }: RowProps) {
  const childrenCount = React.Children.count(children);

  return (
    <View
      wrap={false}
      style={{
        maxWidth: "100%",
        ...commonPdfStyles.row,
        ...style,
      }}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        return (
          <React.Fragment>
            {React.cloneElement(
              child,
              {
                style: {
                  ...child.props.style,
                  flexGrow: 1,
                  flexBasis: `${Math.floor(100 / childrenCount)}%`,
                },
              },
              child.props.children
            )}

            <ShouldRender
              condition={
                child.props.shouldRender !== false &&
                // eslint-disable-next-line eqeqeq
                gap != null &&
                index !== childrenCount - 1
              }
            >
              <Spacer x={gap} />
            </ShouldRender>
          </React.Fragment>
        );
      })}
    </View>
  );
}

type ColumnProps = PropsWithChildren<{
  shouldRender?: boolean;
  style?: StyleProp;
}>;

function Column({ children, shouldRender = true, style }: ColumnProps) {
  return (
    <ShouldRender condition={shouldRender}>
      {React.isValidElement(children) &&
        React.cloneElement(children, { style })}
    </ShouldRender>
  );
}

Row.Column = Column;

export { Row };

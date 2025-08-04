import { CodeBlock } from "@tiptap/extension-code-block";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export const EnhancedCodeBlock = CodeBlock.extend({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("codeBlockTabHandler"),
        props: {
          handleKeyDown: (view, event) => {
            if (event.key === "Tab" && this.editor.isActive("codeBlock")) {
              event.preventDefault();

              if (event.shiftKey) {
                // Handle Shift+Tab (unindent)
                const { state, dispatch } = view;
                const { selection } = state;
                const { from, to } = selection;

                // Get the text content
                const text = state.doc.textBetween(from, to);
                const lines = text.split("\n");

                // Remove indentation from each line
                const unindentedLines = lines.map((line) => {
                  if (line.startsWith("  ")) {
                    return line.slice(2);
                  } else if (line.startsWith("\t")) {
                    return line.slice(1);
                  }
                  return line;
                });

                const unindentedText = unindentedLines.join("\n");

                if (dispatch) {
                  dispatch(state.tr.replaceWith(from, to, state.schema.text(unindentedText)));
                }

                return true;
              } else {
                // Handle Tab (indent)
                const { state, dispatch } = view;
                const { selection } = state;

                if (selection.empty) {
                  // Insert 2 spaces at cursor position
                  if (dispatch) {
                    dispatch(state.tr.insertText("  "));
                  }
                } else {
                  // Indent selected lines
                  const { from, to } = selection;
                  const text = state.doc.textBetween(from, to);
                  const lines = text.split("\n");
                  const indentedLines = lines.map((line) => "  " + line);
                  const indentedText = indentedLines.join("\n");

                  if (dispatch) {
                    dispatch(state.tr.replaceWith(from, to, state.schema.text(indentedText)));
                  }
                }

                return true;
              }
            }

            return false;
          },
        },
      }),
    ];
  },
});

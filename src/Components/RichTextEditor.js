import React, { useState, useEffect, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./RichTextEditor.css";

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(savedContent))
      );
    }
    return EditorState.createEmpty();
  });

  const editorRef = useRef(null); // Reference to the editor

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContent));
  }, [editorState]);

  // 🔹 Function to toggle inline styles (Apply to selected text too)
  const toggleInlineStyle = (e, style) => {
    e.preventDefault();
    if (editorRef.current) {
      editorRef.current.focus();
    }

    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      // If text is selected, apply the style
      const contentState = editorState.getCurrentContent();
      const newContentState = Modifier.applyInlineStyle(contentState, selection, style);
      const newEditorState = EditorState.push(editorState, newContentState, "change-inline-style");
      setEditorState(newEditorState);
    } else {
      // If no text is selected, toggle future text styling
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }
  };

  const toggleBlockType = (e, blockType) => {
    e.preventDefault();
    if (editorRef.current) {
      editorRef.current.focus();
    }
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onMouseDown={(e) => toggleInlineStyle(e, "BOLD")}>
          <i className="fas fa-bold"></i>
        </button>
        <button onMouseDown={(e) => toggleInlineStyle(e, "ITALIC")}>
          <i className="fas fa-italic"></i>
        </button>
        <button onMouseDown={(e) => toggleInlineStyle(e, "UNDERLINE")}>
          <i className="fas fa-underline"></i>
        </button>
        <button onMouseDown={(e) => toggleBlockType(e, "unordered-list-item")}>
          <i className="fas fa-list-ul"></i>
        </button>
        <button onMouseDown={(e) => toggleBlockType(e, "ordered-list-item")}>
          <i className="fas fa-list-ol"></i>
        </button>
      </div>

      <div className="editor-wrapper" onClick={() => editorRef.current.focus()}>
        <Editor
          ref={editorRef} 
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Start typing..."
        />
      </div>
    </div>
  );
};

export default RichTextEditor;

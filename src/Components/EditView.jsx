import { useEffect, useRef } from 'react';

const EditView = ({
  editedTitle,
  setEditedTitle,
  editedContent,
  setEditedContent,
  onSave
}) => {
  // Create a ref to store the contentEditable div
  const contentEditableRef = useRef(null);

  // Effect to set the caret position to the end
  useEffect(() => {
    const contentEditable = contentEditableRef.current;

    if (contentEditable) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentEditable);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [editedContent]); // Run the effect when editedContent changes

  return (
    <div className="flex flex-col w-full justify-between p-2">
      <input
        value={editedTitle}
        type="text"
        placeholder="Title"
        onChange={(e) => setEditedTitle(e.target.value)}
        className="text-md p-2 text-[#e8eaed] mb-2 outline-none"
        style={{
          minHeight: "50px",
          resize: "vertical",
          overflow: "hidden",
          backgroundColor: "#202124",
          color: "whitesmoke",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      />

      <div
        ref={contentEditableRef}
        contentEditable
        onInput={(e) => setEditedContent(e.target.innerHTML)}
        dangerouslySetInnerHTML={{ __html: editedContent }}
        className="p-2 outline-none w-full"
        style={{
          minHeight: "100px",
          maxHeight: "550px",
          height: "100%",
          overflowY: "auto",
          backgroundColor: "#202124",
          color: "whitesmoke",
        }}
      />
      <div className="w-full flex justify-end">
        <button
          onClick={onSave}
          className=" bg-whitesmoke place-content-end text-[#d5d7db] font-black hover:bg-[rgba(154,160,166,0.039)] on rounded p-2 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditView;

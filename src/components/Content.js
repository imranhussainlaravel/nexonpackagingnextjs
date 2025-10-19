"use client";
import React, { useState, useRef } from "react";

const Content = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const charLimit = 1000;

  // Function to get the preview content while preserving structure
  const getPreviewContent = (html, limit) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    let charCount = 0;
    let truncatedHTML = "";

    const traverseNodes = (node) => {
      if (charCount >= limit) return;
      if (node.nodeType === Node.TEXT_NODE) {
        const remainingChars = limit - charCount;
        if (node.nodeValue.length > remainingChars) {
          truncatedHTML += node.nodeValue.slice(0, remainingChars) + "...";
          charCount = limit;
        } else {
          truncatedHTML += node.nodeValue;
          charCount += node.nodeValue.length;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        let innerHTML = `<${node.tagName.toLowerCase()}`;
        for (let attr of node.attributes) {
          innerHTML += ` ${attr.name}="${attr.value}"`;
        }
        innerHTML += ">";
        
        truncatedHTML += innerHTML;

        node.childNodes.forEach(traverseNodes);
        truncatedHTML += `</${node.tagName.toLowerCase()}>`;
      }
    };

    doc.body.childNodes.forEach(traverseNodes);
    return truncatedHTML;
  };

  const shouldShowReadMore = data?.content?.replace(/<[^>]+>/g, "").length > charLimit;

  // Handle Read More / Read Less toggle
  const toggleExpand = () => {
    setExpanded(!expanded);

    // If collapsing, smoothly scroll back to the top of the content
    if (expanded && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={contentRef}
      className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 p-6 md:p-10"
    >
      <div className="prose dark:prose-invert">
        <div
          dangerouslySetInnerHTML={{
            __html: expanded ? data.content : getPreviewContent(data.content, charLimit),
          }}
        ></div>
      </div>
      {shouldShowReadMore && (
        <button
          className="mt-2 text-customRed dark:text-customRed hover:underline transition duration-200"
          onClick={toggleExpand}
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default Content;

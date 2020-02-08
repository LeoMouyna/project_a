<template>
  <v-container class="fill-height" fluid>
    <div id="editor" class="fill-width">
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
    </div>
  </v-container>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the editor.
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "bulletedList",
          "numberedList",
          "blockQuote",
          "|",
          "indent",
          "outdent",
          "|",
          "link",
          "imageUpload",
          "insertTable",
          "mediaEmbed",
          "|",
          "undo",
          "redo"
        ],
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph"
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1"
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2"
            }
          ]
        }
      }
    };
  }
};
</script>

<style scoped>
.fill-width {
  width: 100%;
}
</style>

import icon from "react-icons/lib/md/description";

export default {
  name: "page",
  title: "Stránky",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      title: "Nadpis",
      type: "string"
    },
    {
      name: "slug",
      title: "Značka (neměnit!)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 100
      }
    },
    {
      name: "content",
      title: "Obsah",
      type: "blockContent"
    }
  ]
};

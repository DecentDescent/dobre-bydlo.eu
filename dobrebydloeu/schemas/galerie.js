import icon from "react-icons/lib/md/store";

export default {
  name: "galerie",
  title: "Galerie",
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
      name: "description",
      title: "Popis",
      type: "string"
    },
    {
      name: "content",
      title: "Galerie",
      type: "blockContent"
    }
  ]
};

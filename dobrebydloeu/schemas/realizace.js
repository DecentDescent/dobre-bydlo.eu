import icon from "react-icons/lib/md/photo";

export default {
  name: "realizace",
  title: "Realizace",
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
      title: "Content",
      type: "array",
      of: [
        {
          type: "block"
        },
        {
          type: "image",
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Alternative text"
            }
          ]
        }
      ]
    }
  ]
};

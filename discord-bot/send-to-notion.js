const axios = require("axios");

const options = {
  method: "POST",
  url: "https://api.notion.com/v1/pages",
  headers: {
    accept: "application/json",
    "Notion-Version": "2022-06-28",
    "content-type": "application/json",
    Authorization: "Bearer secret_ymvJN8h14QZom8wBJXNb0wvPZVtRFHHFp3sbEmqNc83",
  },
  data: {
    parent: {
      database_id: "ad9d405ef0574f6eaf061574d50d5178",
    },
    properties: {
      Id: {
        title: [
          {
            text: {
              content: "ほげ",
            },
          },
        ],
      },
      AuthorName: {
        rich_text: [
          {
            text: {
              content: "A dark green leafy vegetable",
            },
          },
        ],
      },
    },
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

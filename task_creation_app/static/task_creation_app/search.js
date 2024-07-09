$(document).ready(function () {
  $(".search").on("keyup", function () {
    const searchTerm = $(this).val();
    const regex = new RegExp(searchTerm, "i");
    $(".task").each(function () {
      console.log(this);
      const title = $(this)
        .children(".task-div")
        .children(".title-div")
        .children(".title")
        .text();
      console.log(title);
      const description = $(this)
        .children(".task-div")
        .children(".description-div")
        .children(".description")
        .text();
      console.log(description);
      if (!regex.test(title) && !regex.test(description)) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
});

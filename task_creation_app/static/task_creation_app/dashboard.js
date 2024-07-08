$(document).ready(function () {
  // Get all tasks from the database
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/api/v1/tasks/",
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa("ezeisraeljohn:testuser123"),
    },
    success: (responses) => {
      console.log(responses);
      responses.results.forEach((response) => {
        let num_tasks;
        let priorityColor;
        let status;
        if (response.status === "progress") {
          status = ".after-progress";
          num_tasks = ".num-progress";
        } else if (response.status === "completed") {
          status = ".after-completed";
          num_tasks = ".num-completed";
        } else {
          status = ".after-overdue";
          num_tasks = ".num-overdue";
        }

        if (response.priority === "Low") {
          priorityColor = "bg-green-500 bg-opacity-20";
        } else if (response.priority === "Medium") {
          priorityColor = "bg-yellow-500 bg-opacity-20";
        } else {
          priorityColor = "bg-red-500 bg-opacity-20";
        }
        due_date = moment(response.due_date);
        $(status)
          .after(`<div class=" task mt-10 rounded cursor-pointer" draggable="true">
                                <div class="flex gap-6">
                                        <div class="${priorityColor} p-2 mb-2 rounded"> ${
          response.priority
        } </div>
                                        <div class="shadow flex gap-2 p-2 mb-2 rounded text-purple-500"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> </svg>
                                        ${due_date.format("L")} </div>
                                        <div class="bg-purple-100 p-2 mb-2 rounded text-purple-500"> ${
                                          response.category
                                        } </div>
                                </div>
                                <div class="task-div bg-gray-100 shadow-lg rounded-lg p-2 mr-20">
                                        <div class="title flex ">
                                                <div class="text-xl font-semibold opacity-75">${
                                                  response.title
                                                }</div>
                                                <div class="ml-auto">
                                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 6h.01M12 12h.01M12 18h.01"/>
                                                </svg></div>
                                        </div>
                                        <div class="description font-inter mt-5 pr-5 text-gray-600 opacity-75"> <p>
                                                ${response.description}
                                        </p></div>
                                        <div class="contributor-user mt-7 flex">
                                                <div class="contributor flex">
                                                        <div class="flex -space-x-2">
                                                                <img class="inline-block w-6 h-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description">
                                                                <img class="inline-block w-6 h-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description">
                                                                <img class="inline-block w-6 h-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Image Description">
                                                                <div class="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-blue-600 items-center justify-center flex text-white">+2</div>
                                                            </div>
                                                </div>
                                                <div class="see-edit-delete gap-2 flex ml-auto">
                                                        <div class="see">
                                                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg
                                                                " width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                        <path class="dark:text-blue-600" stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                                                        <path class="dark:text-blue-600" stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                                </svg>
                                                        </div>
                                                        <div class="delete">
                                                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path class="dark:text-blue-600" fill="currentColor" fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                                                </svg>
                                                        </div>
                                                        <div class="edit">
                                                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                        <path class="dark:text-blue-600" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                                                                </svg>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>`);
        const task_num = parseInt($(num_tasks).text());
        $(num_tasks).text(`${task_num + 1}`);
      });
    },
  });
  $("#taskForm").on("submit", function (event) {
    event.preventDefault();
    const data = {
      title: $("#title").val(),
      description: $("#description").val(),
      status: $("#status").val(),
      priority: $("#priority").val(),
      due_date: $("#due_date").val(),
      category: $("#category").val(),
      assigned_to: $("#assigned_to").val(),
    };
    console.log(data);
    console.log(JSON.stringify(data));

    // Add a task to the database
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8000/api/v1/tasks/",
      method: "POST",
      contentType: "application/json",
      headers: {
        Authorization: "Basic " + btoa("ezeisraeljohn:testuser123"),
        "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val(),
      },
      data: JSON.stringify(data),
      success: function (response) {
        alert("Task created successfully!");
        modal.hide();
        $("body").children().removeClass("blurred");
        let num_tasks;
        let priorityColor;
        let status;
        if (response.status === "progress") {
          status = ".after-progress";
          num_tasks = ".num-progress";
        } else if (response.status === "completed") {
          status = ".after-completed";
          num_tasks = ".num-completed";
        } else {
          status = ".after-overdue";
          num_tasks = ".num-overdue";
        }

        if (response.priority === "Low") {
          priorityColor = "bg-green-500 bg-opacity-20";
        } else if (response.priority === "Medium") {
          priorityColor = "bg-yellow-500 bg-opacity-20";
        } else {
          priorityColor = "bg-red-500 bg-opacity-20";
        }
        due_date = moment(response.due_date);
        $(status)
          .after(`<div class=" task mt-10 rounded cursor-pointer" draggable="true">
                        <div class="flex gap-6">
                                <div class="${priorityColor} p-2 mb-2 rounded"> ${
          response.priority
        } </div>
                                <div class="shadow flex gap-2 p-2 mb-2 rounded text-purple-500"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                ${due_date.format("L")} </div>
                                <div class="bg-purple-100 p-2 mb-2 rounded text-purple-500"> ${
                                  response.category
                                } </div>
                        </div>
                    <div class="task-div bg-gray-100 shadow-lg rounded-lg p-2 mr-20">
                        <div class="title flex">
                                <div class="text-xl font-semibold opacity-75">${
                                  response.title
                                }</div>
                                <div class="ml-auto">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 6h.01M12 12h.01M12 18h.01"/>
                                </svg></div>
                                      
                        </div>
                        <div class="description font-inter mt-5 pr-5 text-gray-600 opacity-75"> <p>
                                ${response.description}
                        </p></div>

                        <div class="contributor-user mt-7 flex">
                                <div class="contributor flex">
                                        <div class="flex -space-x-2">
                                                <img class="inline-block w-6 h-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description">
                                                <img class="inline-block w-6 h-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description">
                                                <img class="inline-block w-6 h-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Image Description">
                                                <div class="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-blue-600 items-center justify-center flex text-white">+2</div>
                                            </div>
                                </div>

                                <div class="see-edit-delete gap-2 flex ml-auto">
                                        <div class="see">
                                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path class="dark:text-blue-600" stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                                        <path class="dark:text-blue-600" stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                </svg>                                                      
                                        </div>
                                        <div class="delete">
                                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path class="dark:text-blue-600" fill="currentColor" fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                                </svg>                                                                                                               
                                        </div>
                                        <div class="edit">
                                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path class="dark:text-blue-600" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                                                </svg>
                                                                                                                                                                 
                                        </div>
                                </div>
                        </div>

                 </div>
        </div>`);
        const task_num = parseInt($(num_tasks).text());
        $(num_tasks).text(`(${task_num + 1})`);
      },
      error: function (error) {
        console.error("Error:", error); // Debugging: Log any errors
        console.log("Status:", error.status); // Debugging: Log the status code
        console.log("Response Text:", error.responseText); // Debugging: Log the response text
        alert("Error creating task");
      },
    });
  });
  $(".task").draggable({
    revert: "invalid",
  });

  $("#in-progress, #completed, #overdue").droppable({
    accept: ".task",
    drop: function (event, ui) {
      $(this).append(ui.draggable);
      ui.draggable.css({ top: "1px", left: "0px" });
    },
  });
  $("#menu-toggle").click(function () {
    $("#menu").toggleClass("hidden");
  });
  const modal = $("#myModal");
  const btn = $("#openModalBtn");
  const span = $(".close");

  btn.on("click", function () {
    modal.show();
  });

  span.on("click", function () {
    modal.hide();
    $("body").children().removeClass("blurred");
  });

  $(window).on("click", function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
      $("body").children().removeClass("blurred");
    }
  });
});

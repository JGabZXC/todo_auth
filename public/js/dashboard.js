$(".todo-main-container").html(""); // Clear the content

const modalTitle = $("#itemModalTitle");
const modalContent = $("#modal-content-item");
const modalClose = $(".modal-close");

const todo = [
  "Clean car",
  "Do dishes",
  "Clean bedroom",
  "Do homework",
  "Clean fridge",
  "Take a bath",
  "Llasdjkawklj danmasndlk lzkjxcksn dkoszxczxczxc",
];

todo.forEach((item, index) => {
  const itemx = item.length > 15 ? item.slice(0, 15) + "..." : item;
  const html = `
        <div id='item_${index}' class="todo-container" data-toggle="modal" data-target="#itemModal">
            <div class="item-display-container">
                <p>${index + 1}. ${itemx}</p>
            </div>

            <div class="item-action-button-container">
                <div>
                    <button class="btn btn-done">Open</button>
                </div>
            </div>
        </div>
    `;

  $(".todo-main-container").append(html);

  $(`#item_${index}`).on("click", function () {
    modalTitle.text(index);
    modalContent.text(item);
  });
});

modalClose.on("click", function () {
  modalTitle.text("");
  modalContent.text("");
});

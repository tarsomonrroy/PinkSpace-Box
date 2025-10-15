var cards = document.querySelectorAll('.popup-cards button');
var dim = document.querySelector('#dim');
var big_card = document.querySelector("#big-card");

cards.forEach(card => {
    card.onclick = () => {
        let title = card.children[1].children[0].firstChild.nodeValue;
        let desc = card.children[1].children[1].cloneNode(true);
        let img_src = card.children[0].getAttribute("src");
        dim.classList.remove("hidden");
        big_card.classList.remove("hidden");
        big_card.children[0].children[0].setAttribute("src", img_src);
        big_card.children[1].children[0].firstChild.nodeValue = title;
        big_card.children[1].children[1].replaceWith(desc);
        big_card.children[1].children[1].classList.remove("hidden");
    };
});

dim.onclick = () => {
    dim.classList.add("hidden");
    big_card.classList.add("hidden");
};
const input = $('#texto-tarefa');
const ol = $('#lista-tarefas');
const button = $('#criar-tarefa');
const btnApgTudo = $('#apaga-tudo');
const btnApgFinish = $('#remover-finalizados');
const btnSalvar = $('#salvar-tarefas');
const btnMoveCima = $('#mover-cima');
const btnMoveBaixo = $('#mover-baixo');
const btnMRemoveSelected = $('#remover-selecionado');

btnMoveCima.click(() => {
  const listSelected = $('.selected');
  if (listSelected) {
    console.log('selected');
    const moveUp = listSelected.prev();
    if (moveUp) {
      moveUp.before(listSelected);
    }
  }
});

btnMoveBaixo.click(() => {
  const listSelected = $('.selected');
  if (listSelected) {
    const moveDown = listSelected.next();
    if (moveDown) {
      moveDown.after(listSelected);
    }
  }
});

btnApgFinish.click(() => {
  const listCompleted = $('.completed');
  listCompleted.remove();
});

btnMRemoveSelected.click(() => {
  const listSelected = $('.selected');
  listSelected.remove();
});

btnApgTudo.click(() => {
  const li = $('.list');
  li.remove();
});

function addList(inputValue = input.val(), style = '', classN = 'list') {
  ol.append(`<li class="${classN}" style="text-decoration:${style}; background: white">${inputValue}</li>`);
  input.val('');
}

function addListAux() {
  const lista = $('.list');
  if (lista.length < 10) {
    input.val() !== '' ? addList() : alert('Campo Vazio');
  } else {
    alert('Lista execeu o limite de 10 itens');
  }
}

button.click(() => addListAux());

function selectColor(event) {
  $.each($('.list'), function() {
    $(this).css('background', 'white');
  });
  $(event.target).css('background-color', 'rgb(128, 128, 128)');
}

function backgroundChange(event) {
  const listdSelected = $('.selected');
  if (listdSelected) {
    listdSelected.removeClass('selected');
    listdSelected.css('background', '');
  }
  $(event.target).addClass('selected');

  selectColor(event);
}

ol.click((event) => backgroundChange(event));

ol.dblclick((event) => {
  const decoration = 'line-through solid rgb(0, 0, 0)';
  const mudaText = $(event.target);
  if (mudaText.css('text-decoration') === decoration) {
    mudaText.css('text-decoration', 'none');
    mudaText.removeClass('completed');
  } else {
    mudaText.css('text-decoration', decoration);
    mudaText.addClass('completed');
  }
});

function removeSaveAll() {
  for (let index = 0; index < 10; index +=1) {
    localStorage.removeItem(index);
  }
}

function salvarTarefa() {
  removeSaveAll();  
  $.each($('.list'), function (indice) {
    const dados = {
      name: $(this).html(),
      style: $(this).css('textDecoration'),
      class: $(this).attr('class'),
    };
    localStorage.setItem(indice, JSON.stringify(dados));
  });
}

btnSalvar.click(() => salvarTarefa());

window.onload = function inicial() {
  for (let index = 0; index < localStorage.length; index += 1) {
    const dados = JSON.parse(localStorage.getItem(index));
    addList(dados.name, dados.style, dados.class);
  }
};

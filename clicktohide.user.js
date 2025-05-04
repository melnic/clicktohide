// ==UserScript==
// @name         Ctrl+Click Element Hider & Restorer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Oculta elementos com Ctrl+Click e restaura todos com Ctrl+H
// @author       Você
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Array para armazenar elementos ocultados
    const hiddenElements = new Set();

    // Função para ocultar/alternar elemento
    function toggleElementVisibility(element) {
        if (element.style.display === 'none') {
            element.style.display = '';
            hiddenElements.delete(element);
            console.log('Elemento mostrado:', element);
        } else {
            element.style.display = 'none';
            hiddenElements.add(element);
            console.log('Elemento ocultado:', element);
        }
    }

    // Função para restaurar todos os elementos ocultos
    function restoreAllHiddenElements() {
        hiddenElements.forEach(element => {
            element.style.display = '';
            console.log('Elemento restaurado:', element);
        });
        hiddenElements.clear();
        console.log('Todos os elementos foram restaurados');
    }

    // Ouvinte para Ctrl+Click
    document.addEventListener('click', function(event) {
        if (event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
            event.preventDefault();
            event.stopPropagation();
            toggleElementVisibility(event.target);
        }
    }, true);

    // Ouvinte para Ctrl+H
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key.toLowerCase() === 'h' && !event.altKey && !event.shiftKey && !event.metaKey) {
            event.preventDefault();
            restoreAllHiddenElements();
        }
    });
})();

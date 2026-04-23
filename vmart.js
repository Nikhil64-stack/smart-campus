

document.addEventListener('DOMContentLoaded', function () {


    var searchInput = document.getElementById('vmart-search');
    var availableCheckbox = document.getElementById('available-only');
    var noResultsDiv = document.getElementById('no-results');

    var allCards = document.querySelectorAll('.category-section .card');


    function applyFilters() {
        var searchTerm = searchInput.value.toLowerCase().trim();
        var showAvailableOnly = availableCheckbox.checked;
        var visibleCount = 0;


        for (var i = 0; i < allCards.length; i++) {
            var card = allCards[i];
            var titleElement = card.querySelector('.card-title');
            var badgeElement = card.querySelector('.badge');


            var productName = titleElement ? titleElement.textContent.toLowerCase() : '';


            var isAvailable = true;
            if (badgeElement) {
                isAvailable = badgeElement.classList.contains('badge-success');
            }


            var matchesSearch = (searchTerm === '') || (productName.indexOf(searchTerm) !== -1);


            var matchesAvailability = !showAvailableOnly || isAvailable;


            if (matchesSearch && matchesAvailability) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }

            if (badgeElement) {
                if (isAvailable) {
                    badgeElement.style.fontWeight = 'bold';
                    badgeElement.style.boxShadow = '0 1px 3px rgba(46, 125, 50, 0.3)';
                } else {
                    badgeElement.style.fontWeight = 'bold';
                    badgeElement.style.boxShadow = '0 1px 3px rgba(198, 40, 40, 0.3)';
                    badgeElement.style.textDecoration = showAvailableOnly ? 'line-through' : 'none';
                }
            }
        }


        var categorySections = document.querySelectorAll('.category-section');
        for (var j = 0; j < categorySections.length; j++) {
            var section = categorySections[j];
            var sectionCards = section.querySelectorAll('.card');
            var sectionHasVisible = false;

            for (var k = 0; k < sectionCards.length; k++) {
                if (sectionCards[k].style.display !== 'none') {
                    sectionHasVisible = true;
                    break;
                }
            }


            var categoryTitle = section.querySelector('.category-title');
            if (categoryTitle) {
                categoryTitle.style.display = sectionHasVisible ? '' : 'none';
            }
        }


        if (visibleCount === 0) {
            noResultsDiv.style.display = 'block';
        } else {
            noResultsDiv.style.display = 'none';
        }
    }


    searchInput.addEventListener('input', function () {
        applyFilters();
    });


    availableCheckbox.addEventListener('change', function () {
        applyFilters();
    });

    var index = 0;
    while (index < allCards.length) {
        var badge = allCards[index].querySelector('.badge');
        if (badge) {
            badge.style.fontWeight = 'bold';
            if (badge.classList.contains('badge-success')) {
                badge.style.boxShadow = '0 1px 3px rgba(46, 125, 50, 0.3)';
            } else {
                badge.style.boxShadow = '0 1px 3px rgba(198, 40, 40, 0.3)';
            }
        }
        index++;
    }
});



document.addEventListener('DOMContentLoaded', function () {

    var pickupSelect = document.getElementById('pickup');
    var dropSelect = document.getElementById('drop');
    var submitBtn = document.getElementById('shuttle-btn');
    var messageDiv = document.getElementById('shuttle-message');


    function validateShuttleForm() {
        var pickup = pickupSelect.value;
        var drop = dropSelect.value;


        messageDiv.innerHTML = '';
        messageDiv.className = '';


        if (pickup === '') {
            showMessage('Please select a pickup location.', 'error');
            return;
        }


        if (drop === '') {
            showMessage('Please select a drop location.', 'error');
            return;
        }


        if (pickup === drop) {
            showMessage('Pickup and drop locations cannot be the same.', 'error');
            return;
        }


        var pickupName = pickupSelect.options[pickupSelect.selectedIndex].text;
        var dropName = dropSelect.options[dropSelect.selectedIndex].text;
        showMessage('Shuttle Requested Successfully! Driver will pick you up from ' + pickupName + ' and drop you at ' + dropName + '.', 'success');
    }


    function showMessage(text, type) {
        messageDiv.textContent = text;

        if (type === 'error') {
            messageDiv.className = 'error-msg';
        } else if (type === 'success') {
            messageDiv.className = 'success-msg';
        }
    }


    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        validateShuttleForm();
    });


    pickupSelect.onchange = function () {
        messageDiv.innerHTML = '';
        messageDiv.className = '';
    };

    dropSelect.onchange = function () {
        messageDiv.innerHTML = '';
        messageDiv.className = '';
    };
});

$(function() {
    $('input').click(function() {
        $.ajax({
            url: '/wallet/new',
            type: 'GET',
            success: function(response) {
                document.querySelector("#public_key").innerHTML = response['public_key'];
                document.querySelector("#private_key").innerHTML = response['private_key'];
                document.querySelector("#warning").style.display = "block";
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});
function showAlert() {
    alert("IMPORTANT:\n\n- Save your private and public keys. These keys cannot be recovered!\n- Don't share your private key with anyone!");
}

showAlert();

document.addEventListener('DOMContentLoaded', function() {
     document.querySelector("#generate_transaction").addEventListener("click", function() {
             fetch("/generate/transaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(new FormData(document.querySelector('#transaction_form')))
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('#confirmation_sender_public_key').value = data.transaction.sender_public_key;
            document.querySelector('#confirmation_recipient_public_key').value = data.transaction.recipient_public_key;
            document.querySelector('#confirmation_amount').value = data.transaction.amount;
            document.querySelector('#transaction_signature').value = data.signature;

                 const basicModal = new bootstrap.Modal(document.getElementById('basic_modal'));
            basicModal.show();
        })
        .catch(error => console.error('Error:', error));
    });

    document.querySelector("#button_confirm_transaction").addEventListener("click", function() {
        const nodeUrl = document.querySelector('#node_url').value;

        fetch(`${nodeUrl}/transactions/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*"
            },
            body: new URLSearchParams(new FormData(document.querySelector('#confirmation_transaction_form')))
        })
        .then(response => response.json())
        .then(data => {
            const basicModal = new bootstrap.Modal(document.getElementById('basic_modal'));
            basicModal.hide();

            const successTransactionModal = new bootstrap.Modal(document.getElementById('success_transaction_modal'));
            successTransactionModal.show();
        })
        .catch(error => console.error('Error:', error));
    });
});

document.querySelector("#button_confirm_transaction").addEventListener("click", function() {
        const nodeUrl = document.querySelector('#node_url').value;

        fetch(`${nodeUrl}/transactions/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*"
            },
            body: new URLSearchParams(new FormData(document.querySelector('#confirmation_transaction_form')))
        })
        .then(response => response.json())
        .then(data => {
            closeModal();
            alert("Transaction confirmed successfully!");
        })
        .catch(error => console.error('Error:', error));
    });


function showModal() {
    document.querySelector("#basic_modal").style.display = "block";
}

function closeModal() {
    document.querySelector("#basic_modal").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('#navbar-toggle');
    const navbarCollapse = document.querySelector('#navbar-collapse');
    toggleButton.addEventListener('click', function() {
        navbarCollapse.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('#navbar-toggle');
    const navbarCollapse = document.querySelector('#navbar-collapse');

    toggleButton.addEventListener('click', function() {
        navbarCollapse.classList.toggle('active');
    });
});

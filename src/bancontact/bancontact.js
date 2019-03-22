const qrButton = document.querySelector('.qr-button');
const appButton = document.querySelector('.app-button');
const amount = { currency: 'EUR', value: 500 };
const paymentRequest = {
    amount,
    reference: 'Checkout Components sample code test',
    paymentMethod: { type: 'bcmc_mobile_QR'}
};

appButton.addEventListener('click', e => {
    triggerPayment('app');
});

qrButton.addEventListener('click', e => {
    triggerPayment();
});

function triggerPayment(type = 'qrCode') {
    getOriginKey().then(originKey => {
        const checkout = new AdyenCheckout({ originKey });

        httpPost('payments', paymentRequest)
            .then(response => {     
                if (response.resultCode === 'PresentToShopper') {
                    if (type === 'app') {
                        window.location.href = response.redirect.data.qrCodeData;
                    } else {
                        const bancontact = checkout
                            .create('bcmc_mobile', {
                                paymentData: response.paymentData,
                                amount,
                                qrCodeData: response.redirect.data.qrCodeData,
                                onChange: state => updateStateContainer(state)
                            })
                            .mount('#bancontact');
                    }
                }
            })
            .catch(console.error);
    });
}

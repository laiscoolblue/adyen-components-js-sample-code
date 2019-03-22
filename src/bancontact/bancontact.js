
getPaymentMethods('BE').then(response => console.log(response));

getOriginKey().then(originKey => {
    const checkout = new AdyenCheckout({ originKey });
    const amount = { currency: 'EUR', value: 500 };
    const paymentRequest = {
        amount,
        reference: 'Checkout Components sample code test',
        paymentMethod: { type: 'bcmc_mobile_QR'}
    };

    httpPost('payments', paymentRequest)
        .then(response => {
            if (response.resultCode === 'PresentToShopper') {
                const bancontact = checkout
                    .create('bcmc_mobile', {
                        paymentData: response.paymentData,
                        amount,
                        qrCodeData: response.redirect.data.qrCodeData,
                        onChange: state => updateStateContainer(state)
                    })
                    .mount('#bancontact');
            }
        })
        .catch(console.error);
});

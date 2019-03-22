
getPaymentMethods('BE').then(response => console.log(response));

const checkout = new AdyenCheckout();

const amount = { currency: "EUR", value: 500 };

const paymentRequest = {
    reference: `Checkout Components sample code test`,
    amount,
    paymentMethod: {
        type: 'bcmc_mobile'
    }
};

httpPost('payments', paymentRequest)
    .then(response => {
        console.log({ response });
        updateResponseContainer(response);
        if (response.resultCode === 'PresentToShopper') {
            const bancontact = checkout
                .create('bcmc_mobile', {
                    paymentData: response.paymentData,
                    amount,
                    qrCodeData: response.redirect.data.qrCodeData,
                    onChange: (state) => {
                        updateStateContainer(state);
                    }
                })
                .mount("#bancontact");
        }
    })
    .catch(console.error);

// declare global state
let state;

// Set the state, use local storage if it exists, otherwise fetch from Product.json
if (localStorage.getItem('state')) {
    setState(JSON.parse(localStorage.getItem('state')));
} else {
    fetch('Product.json')
        .then((res) => res.json())
        .then(setState);
}

// Use state to fill the render-container
function render() {
    const renderContainer = document.getElementById('card-container');
    renderContainer.innerHTML = '';
    const editrows = document.getElementById('editrows');
    editrows.innerHTML = '';
    state.forEach((product, id) => {
        const div = document.createElement('div');
        const buybutton = document.createElement('button');
        buybutton.id = `buy${id}`;
        buybutton.type = 'button';
        buybutton.innerHTML = 'Buy';
        buybutton.classList.add(
            'text-white',
            'bg-blue-700',
            'hover:bg-blue-800',
            'font-medium',
            'rounded-lg',
            'text-xs',
            'px-4',
            'py-2',
            'text-center',
            'dark:bg-blue-600',
            'dark:hover:bg-blue-700',
            'dark:focus:ring-blue-800',
        );
        div.classList.add(
            'max-w-fit',
            'rounded',
            'overflow-hidden',
            'drop-shadow-[0_35px_35px_rgba(255,255,255,0.4)]',
            'm-4',
            'hover:scale-110',
            'ease-in',
            'duration-200',
            'flex',
            'flex-col',
            'items-center',
        );
        div.innerHTML = `
        <img src="${product.picture}" alt="${product.name}" class="w-full h-80 w-60 object-cover">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">${product.name}</div>
            <p class=" text-base text-center">$${product.price}</p>
        </div>
        ${buybutton.outerHTML}
    `;
        renderContainer.appendChild(div);

        const row = document.createElement('tr');
        row.classList.add('border-b', 'hover:bg-gray-800', 'bg-black');
        row.id = id;
        const deletebutton = document.createElement('button');
        deletebutton.classList.add(
            'text-sm',
            'bg-red-500',
            'hover:bg-red-700',
            'text-white',
            'py-1',
            'px-2',
            'ml-2',
            'rounded',
            'focus:outline-none',
            'focus:shadow-outline',
        );
        deletebutton.id = `delete${id}`;
        deletebutton.type = 'button';
        deletebutton.innerHTML = 'Delete';
        // Create save button
        const savebutton = document.createElement('button');
        savebutton.classList.add(
            'text-sm',
            'bg-blue-500',
            'hover:bg-blue-700',
            'text-white',
            'py-1',
            'px-2',
            'rounded',
            'focus:outline-none',
            'focus:shadow-outline',
        );
        savebutton.id = `save${id}`;
        savebutton.type = 'button';
        savebutton.innerHTML = 'Save';
        row.innerHTML = `
        <td class="p-3 px-5"><input id="titel" type="#" value="${id}" class="bg-transparent text-white font-bold"></td>
        <td class="p-3 px-5"><input id="titel" type="#" value="${product.name}" class="bg-transparent text-white"></td>
        <td class="p-3 px-5"><input id="prijs" type="number" value="${product.price}" 
        class="bg-transparent text-white"></td>
        <td class="p-3 px-5"><input id="Url" type="#" value="${product.picture}" class="bg-transparent text-white"></td>
        </td>
        <td class="p-3 px-5 flex justify-end">
        ${savebutton.outerHTML}
        ${deletebutton.outerHTML}
        </td>
    `;
        editrows.appendChild(row);
    });

    // Get all buy buttons
    const buyButtons = document.querySelectorAll('[id^=buy]');

    // Add event listener to buy buttons
    buyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Get product from state with the same id as buy button
            const id = parseInt(button.id.replace('buy', ''));

            const product = state[id];

            // Get productadded element
            const productadded = document.getElementById('productadded');
            const alertContent = document.createElement('div');
            alertContent.classList.add('rounded-md', 'bg-[#C4F9E2]', 'p-4', 'mt-4');
            alertContent.innerHTML = `
    <p class="flex items-center text-sm font-medium text-[#004434]">
        <span class="pr-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#00B078"></circle>
                <path fill-rule="evenodd" clip-rule="evenodd" d=
                "M14.1203 6.78954C14.3865 7.05581 14.3865 7.48751 14.1203 7.75378L9.12026 12.7538C8.85399 
                13.02 8.42229 13.02 8.15602 12.7538L5.88329 10.4811C5.61703 10.2148 5.61703 9.78308 5.88329 
                9.51682C6.14956 9.25055 6.58126 9.25055 6.84753 9.51682L8.63814 11.3074L13.156 6.78954C13.4223 
                6.52328 13.854 6.52328 14.1203 6.78954Z" fill="white"></path>
            </svg>
        </span>
        Your ${product.name} has been successfully added!
    </p>
`;

            productadded.appendChild(alertContent);

            // Delete thank you after 5 seconds with fade out effect
            setTimeout(() => {
                alertContent.style.opacity = '0';
                alertContent.style.transition = 'opacity 0.3s';
                setTimeout(() => {
                    alertContent.remove();
                }, 300);
            }, 3000);

            // Create an SVG element
            const deleteitem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            deleteitem.setAttribute('id', `deleteitem${id}`);
            deleteitem.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            deleteitem.setAttribute('fill', 'none');
            deleteitem.setAttribute('viewBox', '0 0 24 24');
            deleteitem.setAttribute('stroke-width', '1.5');
            deleteitem.setAttribute('stroke', 'currentColor');
            deleteitem.setAttribute('class', 'h-5 w-5 cursor-pointer duration-150 hover:text-red-500');

            // Create a path element
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('d', 'M6 18L18 6M6 6l12 12');

            // Append the path element to the SVG element
            deleteitem.appendChild(path);

            // Create element for span-
            const spanmin = document.createElement('span');
            spanmin.id = `-item${id}`;
            spanmin.classList.add(
                'cursor-pointer',
                'rounded-l',
                'bg-gray-100',
                'py-1',
                'px-3.5',
                'duration-100',
                'hover:bg-blue-500',
                'hover:text-blue-50',
            );
            spanmin.innerHTML = '-';

            // Create element for span+
            const spanplus = document.createElement('span');
            spanplus.id = `+item${id}`;
            spanplus.classList.add(
                'cursor-pointer',
                'rounded-r',
                'bg-gray-100',
                'py-1',
                'px-3.5',
                'duration-100',
                'hover:bg-blue-500',
                'hover:text-blue-50',
            );
            spanplus.innerHTML = '+';

            // Add product to cart
            const cartitems = document.getElementById('cartitems');
            const cartitem = document.createElement('div');
            cartitem.id = `cartitem${id}`;
            cartitem.innerHTML = `
            <div class="justify-between mb-6 rounded-lg border p-6 shadow-md sm:flex sm:justify-start">
                <img id="cartpicture" src="${product.picture}" alt="product-image"
                class="w-full rounded-lg sm:w-40 sm:h-20 object-cover"/>
                <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div class="mt-5 sm:mt-0">
                        <h2 id="carttitle" class="text-lg font-bold">${product.name}</h2>
                    </div>
                    <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div class="flex items-center border-gray-100 text-black">
                            ${spanmin.outerHTML}
                            <input id="input${id}" type="number"
                            class="h-8 w-8 border text-center text-xs outline-none" value="1">
                            ${spanplus.outerHTML}
                        </div>
                        <div class="flex items-center space-x-4">
                            <p id="costs${id}" class="text-sm">${product.price}</p>
                            ${deleteitem.outerHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;

            cartitems.appendChild(cartitem);

            // Get svg element id from cartitem
            const deleteitembutton = document.getElementById(`deleteitem${id}`);
            // Add event listener to delete item button
            deleteitembutton.addEventListener('click', () => {
                // Apply fade-out effect using CSS transition
                cartitem.style.opacity = '0';
                cartitem.style.transition = 'opacity 0.3s';

                // Remove the cart item from DOM after the fade-out animation completes
                setTimeout(() => {
                    cartitem.remove();
                }, 300);
            });

            document.getElementById(`input${id}`).addEventListener('change', () => {
                // Update the cost based on the new value
                const input = document.getElementById(`input${id}`);
                const costElement = document.getElementById(`costs${id}`);
                const cost = parseFloat(product.price) * parseInt(input.value);
                costElement.innerHTML = cost.toFixed(2);
                const costs = document.querySelectorAll('[id^=costs]');

                // Put costs in array
                const costsArray = [];
                costs.forEach((price) => {
                    const parsedValue = parseFloat(price.innerHTML);
                    if (parsedValue) {
                        costsArray.push(parsedValue);
                    }
                });
                // Calculate total cost
                const totalCost = costsArray.reduce((a, b) => a + b, 0);
                // Get totalcost and costsshipping element
                const subtotal = document.getElementById('subtotal');
                const costsshipping = document.getElementById('includingvat');
                // add totalcost to totalcost element
                subtotal.innerHTML = totalCost;
                // add shippingcost to costsshipping element
                costsshipping.innerHTML = totalCost + 5;
            });

            const plusbutton = document.getElementById(`+item${id}`);
            // Add event listener to plus button
            plusbutton.addEventListener('click', () => {
                // Get input element id from cartitem
                const input = document.getElementById(`input${id}`);
                // Increase input value by 1
                input.value = parseInt(input.value) + 1;
                // Update the cost based on the new value
                const costElement = document.getElementById(`costs${id}`);
                const cost = parseFloat(product.price) * parseInt(input.value);
                costElement.innerHTML = cost.toFixed(2);
                const costs = document.querySelectorAll('[id^=costs]');

                // Put costs in array
                const costsArray = [];
                costs.forEach((price) => {
                    const parsedValue = parseFloat(price.innerHTML);
                    if (!isNaN(parsedValue)) {
                        costsArray.push(parsedValue);
                    }
                });
                // Calculate total cost
                const totalCost = costsArray.reduce((a, b) => a + b, 0);
                // Get totalcost and costsshipping element
                const subtotal = document.getElementById('subtotal');
                const costsshipping = document.getElementById('includingvat');
                // add totalcost to totalcost element
                subtotal.innerHTML = totalCost;
                // add shippingcost to costsshipping element
                costsshipping.innerHTML = totalCost + 5;
            });

            const minusbutton = document.getElementById(`-item${id}`);
            // Add event listener to minus button
            minusbutton.addEventListener('click', () => {
                // Get input element id from cartitem
                const input = document.getElementById(`input${id}`);
                // Decrease input value by 1, but ensure it's at least 1
                input.value = Math.max(parseInt(input.value) - 1, 1);
                // Update the cost based on the new value
                const costElement = document.getElementById(`costs${id}`);
                const cost = parseFloat(product.price) * parseInt(input.value);
                costElement.innerHTML = cost.toFixed(2);
                const costs = document.querySelectorAll('[id^=costs]');

                // Put costs in array
                const costsArray = [];
                costs.forEach((price) => {
                    const parsedValue = parseFloat(price.innerHTML);
                    if (parsedValue) {
                        costsArray.push(parsedValue);
                    }
                });
                // Calculate total cost
                const totalCost = costsArray.reduce((a, b) => a + b, 0);
                // Get totalcost and costsshipping element
                const subtotal = document.getElementById('subtotal');
                const costsshipping = document.getElementById('includingvat');
                // add totalcost to totalcost element
                subtotal.innerHTML = totalCost;
                // add shippingcost to costsshipping element
                costsshipping.innerHTML = totalCost + 5;
            });

            const costs = document.querySelectorAll('[id^=costs]');

            // Put costs in array
            const costsArray = [];
            costs.forEach((cost) => {
                const parsedValue = parseFloat(cost.innerHTML);
                if (parsedValue) {
                    costsArray.push(parsedValue);
                }
            });
            // Calculate total cost
            const totalCost = costsArray.reduce((a, b) => a + b, 0);
            // Get totalcost and costsshipping element
            const subtotal = document.getElementById('subtotal');
            const costsshipping = document.getElementById('includingvat');
            // add totalcost to totalcost element
            subtotal.innerHTML = totalCost;
            // add shippingcost to costsshipping element
            costsshipping.innerHTML = totalCost + 5;
        });
    });

    // get element checkout
    const checkout = document.getElementById('checkout');
    // Add event listener to checkout button
    checkout.addEventListener('click', () => {
        // Get shopping cart element
        const shoppingcart = document.getElementById('shoppingcart');
        // Get addproducts element
        const addproducts = document.getElementById('addproducts');
        // Get editlst element
        const editlist = document.getElementById('editlist');
        // Get cardcontainer element
        const cardcontainer = document.getElementById('card-container');
        // change display for all elements to none
        shoppingcart.style.display = 'none';
        addproducts.style.display = 'none';
        editlist.style.display = 'none';
        cardcontainer.style.display = 'none';
        // create text thank you for your order
        const thankyou = document.createElement('h1');
        thankyou.innerHTML = 'Thank you for your order!';
        thankyou.classList.add('text-3xl', 'text-center', 'mt-20');
        const empty = '';
        const subtotal = document.getElementById('subtotal');
        const includingvat = document.getElementById('includingvat');

        // Get the cart items container element
        const cartItemsContainer = document.getElementById('cartitems');

        // Delete all child elements (cart items)
        while (cartItemsContainer.firstChild) {
            cartItemsContainer.removeChild(cartItemsContainer.firstChild);
        }
        subtotal.innerHTML = empty;
        // Append thank you to body
        document.body.appendChild(thankyou);
        // Delete thank you after 5 seconds with fade out effect
        setTimeout(
            () => {
                thankyou.style.opacity = '0';
                thankyou.style.transition = 'opacity 0.3s';
                setTimeout(() => {
                    thankyou.remove();
                }, 300);
            },
            3000,
        );
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        const date = `${formattedDate} ${formattedTime}`;

        // Retrieve existing totals from local storage
        let existingTotals = localStorage.getItem('Totals');

        // If there are existing totals, parse them from JSON
        if (existingTotals) {
            existingTotals = JSON.parse(existingTotals);
        } else {
            existingTotals = []; // Initialize as an empty array if no totals exist yet
        }

        // Create a new total object
        const total = {
            total: includingvat.textContent,
            date,
        };

        // Check if the new total already exists in the existing totals
        const totalExists = existingTotals.some((existingTotal) => existingTotal.total
        === total.total && existingTotal.date === total.date);

        // Add the new total to the existing totals array if it doesn't already exist
        if (!totalExists) {
            existingTotals.push(total);
        }

        // Save the updated totals array back to local storage
        localStorage.setItem('Totals', JSON.stringify(existingTotals));

        // Get element orderrows
        const orderrows = document.getElementById('orderrows');
        orderrows.innerHTML = '';

        // Create a new row for each total and append it to the orderrows element
        existingTotals.forEach((totalData, index) => {
            const row = document.createElement('tr');
            const idCell = document.createElement('td');
            const totalCell = document.createElement('td');
            const dateCell = document.createElement('td');

            idCell.classList.add('text-left', 'p-3', 'px-5', 'w-2');
            totalCell.classList.add('text-left', 'p-3', 'px-5', 'w-2');
            dateCell.classList.add('text-left', 'p-3', 'px-5', 'w-2');

            idCell.textContent = index;
            totalCell.textContent = totalData.total;
            dateCell.textContent = totalData.date;

            row.appendChild(idCell);
            row.appendChild(totalCell);
            row.appendChild(dateCell);

            orderrows.appendChild(row);
        });
        includingvat.innerHTML = empty;
    });

    // Get orderlist button
    const orderbutton = document.getElementById('orderbutton');
    // Add event listener to orderlist button
    orderbutton.addEventListener('click', () => {
        // Get orderlist element
        const orderlist = document.getElementById('orderslist');
        if (orderlist.style.display === 'none') {
            orderlist.style.display = 'block';
            addproducts.style.display = 'none';
            editlist.style.display = 'none';
            cardcontainer.style.display = 'none';
        }
    });

    // Get delete buttons
    const deleteButtons = document.querySelectorAll('[id^=delete]');
    // Add event listener to delete buttons
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Remove product from state with the same id as delete button
            const id = parseInt(button.id.replace('delete', ''));
            const newState = state.filter((product, index) => index !== id);
            // Update state
            setState(newState);
        });
    });

    // Get save buttons
    const saveButtons = document.querySelectorAll('[id^=save]');
    // Add event listener to save buttons
    saveButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Get row and inputs
            const row = button.parentNode.parentNode;
            const inputs = row.querySelectorAll('input');
            // Get product from state with the same id as save button
            const id = parseInt(button.id.replace('save', ''));
            const product = state[id];
            // Update product with values from inputs
            product.id = inputs[0].value;
            product.name = inputs[1].value;
            product.price = inputs[2].value;
            product.picture = inputs[3].value;
            // Hide form and editlist
            addproducts.style.display = 'none';
            editlist.style.display = 'none';
            cardcontainer.style.display = '';
            // Update state
            setState(state);
        });
    });

    // Get element orderrows
    const orderrows = document.getElementById('orderrows');
    // Get local storage totals
    const existingTotals = localStorage.getItem('Totals');

    // If there are existing totals, parse them from JSON
    if (existingTotals) {
        const totals = JSON.parse(existingTotals);

        // Create a new row for each total and append it to the orderrows element
        totals.forEach((totalData, index) => {
            const row = document.createElement('tr');
            const idCell = document.createElement('td');
            const totalCell = document.createElement('td');
            const dateCell = document.createElement('td');

            idCell.classList.add('text-left', 'p-3', 'px-5', 'w-2');
            totalCell.classList.add('text-left', 'p-3', 'px-5', 'w-2');
            dateCell.classList.add('text-left', 'p-3', 'px-5', 'w-2');

            idCell.textContent = index;
            totalCell.textContent = totalData.total;
            dateCell.textContent = totalData.date;

            row.appendChild(idCell);
            row.appendChild(totalCell);
            row.appendChild(dateCell);

            orderrows.appendChild(row);
        });
    } else {
        orderrows.innerHTML = '<tr><td colspan="3">No orders yet</td></tr>';
    }
}
// Function to get the current state from local storage
function getStateFromStorage() {
    const storedState = localStorage.getItem('state');
    return storedState ? JSON.parse(storedState) : [];
}

// Function to update the state in local storage
function updateStateInStorage(newState) {
    localStorage.setItem('state', JSON.stringify(newState));
}

// Nieuwe state opslaan en daarna opnieuw renderen
function setState(newState) {
    updateStateInStorage(newState);
    state = newState;
    render();
}

function addProducts(newProducts) {
    const newState = [...state, ...newProducts];
    setState(newState);
}

document.getElementById('card-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const imageInput = document.getElementById('image-url');
    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');
    const newProduct = {
        picture: imageInput.value,
        name: titleInput.value,
        price: parseFloat(priceInput.value),
    };

    addProducts([newProduct]);

    // Reset form
    imageInput.value = '';
    titleInput.value = '';
    priceInput.value = '';
    // Hide form and editlist
    addproducts.style.display = 'none';
    editlist.style.display = 'none';
    cardcontainer.style.display = '';
});

// Make a function for the visibility of addproducts and editlist
// get the id of the button
const adminpanel = document.getElementById('adminpanel');
const addproducts = document.getElementById('addproducts');
const cardcontainer = document.getElementById('card-container');
const editlist = document.getElementById('editlist');
const shoppingCart = document.getElementById('shoppingcart');
const orderlist = document.getElementById('orderslist');
// add an event listener to the button
adminpanel.addEventListener('click', () => {
    // style the visibilty to be block/none
    if (addproducts.style.display == 'none') {
        addproducts.style.display = 'block';
        cardcontainer.style.display = 'none';
        editlist.style.display = 'block';
        orderlist.style.display = 'none';
        shoppingCart.style.display = 'none';
    } else if (addproducts.style.display == 'block') {
        addproducts.style.display = 'none';
        cardcontainer.style.display = '';
        editlist.style.display = 'none';
    }
});

//  Get back button
const backbutton = document.getElementById('Backbutton');
// Add event listener to back button
backbutton.addEventListener('click', () => {
    // Get editlist and card container
    if (orderlist.style.display == 'block') {
        orderlist.style.display = 'block';
        addproducts.style.display = 'block';
        editlist.style.display = 'block';
        orderlist.style.display = 'none';
    }
});

// Get shopping cart button
const shoppingCartButton = document.getElementById('Winkelwagen');
// Add event listener to shopping cart button
shoppingCartButton.addEventListener('click', () => {
    // Get shopping cart and the card container
    const cardContainer = document.getElementById('card-container');
    // Toggle visibility of shopping cart
    if (shoppingCart.style.display == 'none') {
        shoppingCart.style.display = 'block';
        cardContainer.style.display = 'none';
        editlist.style.display = 'none';
        addproducts.style.display = 'none';
    } else if (shoppingCart.style.display == 'block') {
        shoppingCart.style.display = 'none';
        cardContainer.style.display = '';
    }
});

document.getElementById('fetch').addEventListener('click', () => {
    // Remove local storage
    localStorage.removeItem('state');

    // Fetch JSON file again
    fetch('Product.json')
        .then((res) => res.json())
        .then((data) => setState(data));
});

// Get pintrst button
document.getElementById('pinterest').addEventListener('click', () => {
    cardcontainer.style.display = 'none';
    shoppingCart.style.display = 'none';
    editlist.style.display = 'none';
    addproducts.style.display = 'none';
    cardcontainer.style.display = '';
});

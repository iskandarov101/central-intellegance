window.addEventListener('DOMContentLoaded', () => {

    const elParent = document.querySelector('.tabheader__items');
    const elTabs = document.querySelectorAll('.tabheader__item');
    const elContent = document.querySelectorAll('.tabcontent');
    const elLoader = document.querySelector('.loader')

    //Loader...
    setTimeout(() => {
        elLoader.style.opacity = '0'
        setTimeout(() => {
            elLoader.style.display = 'none'
        }, 500)
    }, 2000);




    // Tabs
    function hideTapContent() {
        elContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        });
        elTabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }



    function showTapContent(i) {
        elContent[i].classList.add('show', 'fade')
        elContent[i].classList.remove('hide')
        elTabs[i].classList.add('tabheader__item_active')
    }

    hideTapContent();
    showTapContent(0);

    elParent.addEventListener('click', () => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            elTabs.forEach((item, id) => {
                if (target == item) {
                    hideTapContent();
                    showTapContent(id)
                }
            })
        }
    })

    // Timer 
    const deadline = '2022-12-25';


    function getTimeRemainiing(endTime) {
        const timer = Date.parse(endTime) - Date.parse(new Date())
        const days = Math.floor(timer / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timer / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((timer / 1000 / 60) % 60)
        const seconds = Math.floor((timer / 1000) % 60)

        return {
            'total': timer,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeIntervar = setInterval(updateClock, 1000)


        updateClock()
        function updateClock() {
            const t = getTimeRemainiing(endTime)

            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (t.timer <= 0) {
                clearInterval(timeIntervar)
            }
        }
    }

    setClock('.timer', deadline)

    // Modal 
    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');


    function closeModal() {
        modal.classList.add('hide')
        modal.classList.remove('show')

        document.body.style.overflow = ''
    }

    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')

        document.body.style.overflow = 'hidden'
        clearInterval(modalTimer);
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal)
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (evt) => {
        if (evt.target == modal) {
            closeModal()
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code == "Escape" && modal.classList.contains('show')) {
            closeModal()
        }
    });

    const modalTimer = setTimeout(openModal, 5000);

    function showModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1) {
            openModal()
            window.removeEventListener('scroll', showModalScroll)
        }
    }

    window.addEventListener('scroll', showModalScroll)


    // CLASS 
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.parent = document.querySelector(parentSelector)
            this.transfer = 11000
            this.changeToUzs()
        }

        changeToUzs() {
            this.price = this.price * this.transfer
        }

        render() {
            const element = document.createElement('div')

            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">
                        ${this.descr}
                    </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
                </div>
                </div>`

                this.parent.append(element)
        }
    }


    new MenuCard (
        "img/tabs/1.png",
        "usual",
        "Plan 'Usual",
        '  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        10,
        '.menu .container' 
    ).render()

    new MenuCard (
        "img/tabs/2.jpg",
        "elite",
        "Plan “Premium”",
        '  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        15,
        '.menu .container' 
    ).render()

    new MenuCard (
        "img/tabs/3.jpg",
        "post",
        "Plan 'VIP'",
        '  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        12,
        '.menu .container' 
    ).render()



});
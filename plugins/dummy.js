
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const RANDOM_NUM_INT_CACHE = {};
// const RANDOM_NAME_CACHE = {};
// const RANDOM_ITEM_NAME_CACHE = {};

function randomNumber(seed, min, max) {
    if (RANDOM_NUM_INT_CACHE[seed] != null) {
        return RANDOM_NUM_INT_CACHE[seed];
    }
    const num = getRandomInt(min, max);
    RANDOM_NUM_INT_CACHE[seed] = num;
    return RANDOM_NUM_INT_CACHE[seed];
}

const NAME_LIST = [
    "Tiya Damayanti",
    "Urip Raharjo",
    "Eko Prasetyo",
    "Yanto Zulkarnaen Sihombing",
    "Anton Sadewa",
    "Eka Makarya",
    "Intan",
    "Ar"
]

const ITEM_NAME_LIST = [
    "Lorem Ipsum",
    "Dolor Amet",
    "Consectetur adipiscing",
    "Excepteur sint occaecat",
    "Voluptatem",
    "Vox",
    "Quis autem"
]

const USER_PIC_LIST = [
    "https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
    "https://randomuser.me/api/portraits/men/78.jpg",
    "https://randomuser.me/api/portraits/men/79.jpg",
    "https://randomuser.me/api/portraits/men/80.jpg",
    "https://randomuser.me/api/portraits/men/81.jpg",
    "https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578489758854-f134a358f08b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTYwfHxmYWNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
]


function randomName(seed) {
    return NAME_LIST[seed % NAME_LIST.length]
}

function randomItemName(seed) {
    return ITEM_NAME_LIST[seed % ITEM_NAME_LIST.length]
}

function randomUserPic(seed) {
    return USER_PIC_LIST[seed % USER_PIC_LIST.length]
}

function randomItemPic(seed) {
    const i = parseInt(seed) + 1;
    if (i < 6) {
        return `/img/dummy-art-${i}.png`
    }
    return `https://picsum.photos/seed/arare${seed}/400/400`
}

function randomCoverPic(seed) {
    const i = parseInt(seed) + 1;
    if (i < 3) {
        return `/img/dummy-user-cover-${i}.jpg`
    }
    return `https://picsum.photos/seed/arare${((i + 1) * 10)}/1024/400`
}

const LOREM_IPSUM_LIST = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
]

function randomBiography(seed) {
    return LOREM_IPSUM_LIST[seed % LOREM_IPSUM_LIST.length]
}

function generateUser(seed) {
    const i = seed
    const name = randomName(i);
    // let patt = new RegExp('\\W+', 'g')
    return {
        id: i,
        name,
        stars: randomNumber(i, 1, 5),
        rank: randomNumber(i, 1, 10),
        collections: randomNumber(i, 1, 100),
        pic: randomUserPic(i),
        coverPic: randomCoverPic(i),
        biography: randomBiography(i),
        twitter: name.replace(/\W+/g, '_')
    }
}

function generateUsers(count) {
    return Array.from(Array(count).keys()).map((i) => {
        return generateUser(i)
    })
}

function generateItem(seed) {
    const i = seed
    return {
        id: i,
        name: randomItemName(i),
        pic: randomItemPic(i),
        creator: generateUser(i),
        owner: generateUser(i + 1),
    }
}

function generateItems(count) {
    return Array.from(Array(count).keys()).map((i) => {
        return generateItem(i)
    })
}

export default ({ app }, inject) => {
    inject('dummy', {
        generateUser,
        generateUsers,
        generateItem,
        generateItems,
        randomUserPic,
        randomItemPic,
    })
}
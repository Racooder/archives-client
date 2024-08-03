// * shared

function getServerAddress() {
    return localStorage.getItem('serverAddress') || '';
}

// * api interaction

async function fetchArchives() {
    // TODO: fetch from server
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Array.from(Array(20).keys()).map((k) => k.toString()));
        }, Math.random() * 1000);
    });
}

async function fetchServerTitle() {
    // TODO: fetch from server
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Server Title');
        }, Math.random() * 1000);
    });
}

async function fetchArchiveDetails(name, filter) {
    // TODO: fetch from server (optionally using filter)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                title: `Archive ${name}`,
                userCount: Math.floor(Math.random() * 1000),
                documentCount: Math.floor(Math.random() * 10000),
                recordCount: Math.floor(Math.random() * 1000),
                hasPassword: Math.random() > 0.5,
                nsfw: Math.random() > 0.5,
            });
        }, Math.random() * 1000);
    });
}

async function fetchTags() {
    // TODO: fetch from server
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Array.from(Array(20).keys()).map((k) => k.toString()));
        }, Math.random() * 1000);
    });
}

// * index.html

function setupIndexPage() {
    document.getElementById('connectAddress').value = getServerAddress();
    document.getElementById('connectForm').addEventListener('submit', connectToServer);
}

function connectToServer(e) {
    e.preventDefault();
    const address = document.getElementById('connectAddress').value;
    localStorage.setItem('serverAddress', address);

    window.location.href = 'login.html';
}

// * login.html

function setupLoginPage() {
    document.getElementById('loginForm').addEventListener('submit', loginOnServer);
}

function loginOnServer(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // TODO: login on server

    window.location.href = 'archive-list.html';
}

// * register.html

function setupRegisterPage() {
    document.getElementById('registerForm').addEventListener('submit', registerOnServer);
}

function registerOnServer(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const passwordRepeat = document.getElementById('registerPasswordRepeat').value;
    const serverPassword = document.getElementById('registerServerPassword').value;

    if (password !== passwordRepeat) {
        alert('Passwords do not match');
        return;
    }

    // TODO: register on server

    window.location.href = 'archive-list.html';
}

// * archives-list.html

function setupArchivesListPage() {
    const titleElement = document.getElementById('archiveServerTitle');
    titleElement.innerText = getServerAddress().replace(/(^\w+:|^)\/\//, '');
    fetchServerTitle().then(title => {
        titleElement.innerText = title;
    });

    loadArchives();
}

async function loadArchiveDetails(name, titleE, userCountE, documentCountE, recordCountE, settingsHolder, filter) {
    const details = await fetchArchiveDetails(name, filter);

    titleE.innerText = details.title;
    userCountE.innerText = details.userCount;
    documentCountE.innerText = details.documentCount;
    recordCountE.innerText = details.recordCount;

    if (details.hasPassword) {
        const passwordIcon = document.createElement('i');
        passwordIcon.classList.add('fi', 'fi-sr-lock');
        settingsHolder.appendChild(passwordIcon);
    }
    if (details.nsfw) {
        const nsfwIcon = document.createElement('i');
        nsfwIcon.classList.add('fi', 'fi-sr-age-restriction-eighteen');
        settingsHolder.appendChild(nsfwIcon);
    }
}

async function loadArchives() {
    const listHolder = document.getElementById('archiveList');
    const archives = await fetchArchives();
    console.log(archives);

    for (const archive of archives) {
        // Archive Element
        const archiveElement = document.createElement('div');
        archiveElement.classList.add('linkListElement');
        archiveElement.addEventListener('click', () => {
            window.location.href = 'archive.html?archive=' + archive;
        });
        listHolder.appendChild(archiveElement);

        // Rows
        const topRow = document.createElement('div');
        topRow.classList.add('linkListRow');
        archiveElement.appendChild(topRow);
        const bottomRow = document.createElement('div');
        bottomRow.classList.add('linkListRow', 'archiveStatRow');
        archiveElement.appendChild(bottomRow);

        // Top Row
        const archiveTitle = document.createElement('h2');
        archiveTitle.classList.add('linkListHeading');
        archiveTitle.innerText = archive;
        topRow.appendChild(archiveTitle);
        const settingsHolder = document.createElement('div');
        settingsHolder.classList.add('archiveSettingsHolder');
        topRow.appendChild(settingsHolder);

        // Bottom Row
        const usersHolder = document.createElement('div');
        usersHolder.classList.add('threeElementRow');
        bottomRow.appendChild(usersHolder);
        const documentsHolder = document.createElement('div');
        documentsHolder.classList.add('threeElementRow', 'threeElementRowMid');
        bottomRow.appendChild(documentsHolder);
        const recordsHolder = document.createElement('div');
        recordsHolder.classList.add('threeElementRow');
        bottomRow.appendChild(recordsHolder);

        // Users
        const usersIcon = document.createElement('i');
        usersIcon.classList.add('fi', 'fi-sr-user');
        usersHolder.appendChild(usersIcon);
        const userCountText = document.createElement('label');
        userCountText.classList.add('archiveStatText');
        usersIcon.appendChild(userCountText);

        // Documents
        const documentsIcon = document.createElement('i');
        documentsIcon.classList.add('fi', 'fi-sr-document');
        documentsHolder.appendChild(documentsIcon);
        const documentCountText = document.createElement('label');
        documentCountText.classList.add('archiveStatText');
        documentsIcon.appendChild(documentCountText);

        // Records
        const recordsIcon = document.createElement('i');
        recordsIcon.classList.add('fi', 'fi-sr-folder');
        recordsHolder.appendChild(recordsIcon);
        const recordCountText = document.createElement('label');
        recordCountText.classList.add('archiveStatText');
        recordsIcon.appendChild(recordCountText);

        // Load Details
        loadArchiveDetails(
            archive,
            archiveTitle,
            userCountText,
            documentCountText,
            recordCountText,
            settingsHolder
        );
    }
}

// * new-archive.html

function setupNewArchivePage() {
    document.getElementById('newArchiveForm').addEventListener('submit', createNewArchive);
    togglePasswordInput();
}

function togglePasswordInput() {
    const passwordInput = document.getElementById('archivePassword');
    if (document.getElementById('hasPassword').checked) {
        passwordInput.disabled = false;
    } else {
        passwordInput.disabled = true;
    }
}

function createNewArchive(e) {
    e.preventDefault();
    const archiveName = document.getElementById('archiveName').value;
    const hasPassword = document.getElementById('hasPassword').checked;
    const password = document.getElementById('archivePassword').value;

    if (hasPassword && password === '') {
        alert('Password cannot be empty');
        return;
    }

    // TODO: create new archive on server

    window.location.href = 'archive.html?archive=' + archiveName;
}

// * archive.html

function getFilter() {
    return {}; // TODO: implement
}

async function setupTagSelections() {
    const includeTagsSelect = new SlimSelect({
        select: '#includeTags',
    });
    const excludeTagsSelect = new SlimSelect({
        select: '#excludeTags',
    });

    const tags = await fetchTags();
    const options = tags.map(tag => ({ text: `Tag ${tag}`, value: tag }));
    includeTagsSelect.setData(options);
    excludeTagsSelect.setData(options);
}

function setupArchivePage() {
    const archiveName = new URLSearchParams(window.location.search).get('archive');
    const titleElement = document.getElementById('archiveTitle');
    titleElement.innerText = archiveName;

    loadArchiveDetails(
        archiveName,
        document.getElementById('archiveTitle'),
        document.getElementById('archiveUserCount'),
        document.getElementById('archiveDocumentCount'),
        document.getElementById('archiveRecordCount'),
        document.getElementById('archiveSettingsHolder')
    );

    setupTagSelections();
}

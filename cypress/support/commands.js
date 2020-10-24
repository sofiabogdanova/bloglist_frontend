Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogListUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    const newBlog = {
        author: author,
        title: title,
        url: url,
        likes: likes
    }
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: newBlog,
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogListUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})
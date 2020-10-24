describe('Blog app', function() {
    const testUser = {
        "username": "johnlennon",
        "password": "password",
        "name": "john lennon"
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users', testUser)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('login')

        cy.contains('username')
        cy.get('#username')

        cy.contains('password')
        cy.get('#password')
    })

    describe('Login',function() {
        beforeEach(function() {
            cy.visit('http://localhost:3000')
        })

        it('succeeds with correct credentials', function() {
            cy.get('#username').type('johnlennon')
            cy.get('#password').type('password')
            cy.get('#login').click()

            cy.contains('john lennon logged-in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('johnlennon')
            cy.get('#password').type('blabla')
            cy.get('#login').click()

            cy.contains('Wrong username or password')

            cy.get('.error')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'john lennon logged-in')
        })
    })

    describe('When logged in',function() {
        beforeEach(function() {
            cy.login({ username: testUser.username, password: testUser.password })
            cy.visit('http://localhost:3000')
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Test Title')
            cy.get('#author').type('Test author')
            cy.get('#url').type('url.com')
            cy.contains('save').click()
            cy.contains(`A new blog Test Title by Test author added`)
        })

        it('A blog can be liked', function() {
            cy.createBlog({title: 'Blog to like', author: 'Author to like', url: 'urltolike.com',likes: 0})
            cy.contains('view').click()
            cy.contains('like').click()
        })

        it('A blog can be deleted', function() {
            cy.createBlog({title: 'Blog to delete', author: 'Author to delete', url: 'urltodelete.com',likes: 0})
            cy.contains('view').click()
            cy.contains('remove').click()
        })

        it('Blogs are sorted according to likes', function() {
            cy.createBlog({title: 'Blog 1', author: 'Author 1', url: 'url1.com', likes:1})
            cy.createBlog({title: 'Blog 2', author: 'Author 2', url: 'url2.com', likes:2})
            cy.createBlog({title: 'Blog 3', author: 'Author 3', url: 'url3.com', likes:3})

            cy.contains('Blog 1').contains('view').click()
            cy.contains('Blog 2').contains('view').click()
            cy.contains('Blog 3').contains('view').click()

            cy.get('.blog').then((blogs) => {
                const blog1 = blogs[0].innerText.includes('Blog 3', 0)
                const blog2 = blogs[1].innerText.includes('Blog 2', 0)
                const blog3 = blogs[2].innerText.includes('Blog 1', 0)
                expect(blog1).to.be.true
                expect(blog2).to.be.true
                expect(blog3).to.be.true
            })
        })
    })
})


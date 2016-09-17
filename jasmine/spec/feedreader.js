/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Handlebars tests */
    describe('Handlebars', function() {
        /* Check that google is defined */
        it('is defined', function() {
            expect(Handlebars).toBeDefined();
        });
    });

    /* Google tests */
    describe('Google', function() {
        /* Check that google is defined */
        it('is defined', function() {
            expect(google).toBeDefined();
        });
    });

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a non-empty url', function() {
            allFeeds.forEach(function(item) {
                expect(item.url).toBeTruthy();
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a non-empty name', function() {
            allFeeds.forEach(function(item) {
                expect(item.name).toBeTruthy();
            });
        });
    });


    /* Tests visibility of the menu */
    describe('The menu', function() {

        var $body = $('body');
        var $menuIcon = $('.menu-icon-link');

        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });


         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when menu icon is clicked', function() {
            $menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBeFalsy();

            $menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });

    });

    /* Makes sure loadFeed works */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('are non-empty', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Test suite for New Feed Selection */
    describe('New Feed Selection', function() {

        var $feed = $('.feed');

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('should load different content', function(done){
            var first, second;

            loadFeed(0, function() {
                first = $feed.children().text();

                loadFeed(1, function() {
                    second = $feed.children().text();
                    expect(first).not.toBe(second);
                    done();
                });
            });
        });
    });
}());

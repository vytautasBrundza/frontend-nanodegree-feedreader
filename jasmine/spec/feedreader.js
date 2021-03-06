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
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('links are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            var allURLS=[];
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* A new test suite named "The menu" */

    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            // check if hidden class is applied when page is loaded
            expect(document.body.classList.contains('menu-hidden')).toBeTruthy();
        });

        /* A test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        var button = $( '.menu-icon-link' );

        it('shows when clicked', function() {
            // simulate the click
            button.click();
            // check if class is removed
            expect(document.body.classList.contains('menu-hidden')).toBeFalsy();
        });

        it('hides when clicked again', function() {
            // simulate the click
            button.click();
            // check if class is applied again
            expect(document.body.classList.contains('menu-hidden')).toBeTruthy();
        });
    });

    /* A new test suite named 'Initial Entries' */
    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    describe('Initial Entries', function () {

        beforeEach(function (done) {
            // Make an async call, passing the special done callback
            loadFeed(0,done);
        });

        it('there is at least one entry', function() {
            // print number of entries
            expect($('.entry').length).toBeGreaterThan(0); // updated to use greater than
        });

        it('there are maximum number (four) of entries', function() {
            // print number of entries
            expect($('.entry').length).toBe(4);
        });
    });


    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    describe('New Feed Selection', function() {
        var contentBefore, contentAfter;
        beforeEach(function(done) {
            loadFeed(0, function() {
                contentBefore = $('.feed').html();
                loadFeed(1, function() {
                    contentAfter = $('.feed').html();
                    done();
                });
            });
        });

        it("content changes after load feed function runs", function() {
            expect(contentBefore).not.toBe(contentAfter);
        });
    });

}());


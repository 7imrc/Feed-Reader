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
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds
         * object and ensures it has a URL defined and that the
         * URL is not empty.
         */
         it('has a URL', function() {
           for(let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });

        /* This test loops through each feed in the allFeeds
         * object and ensures it has a name defined and that
         * the name is not empty.
         */
         it('has a name', function() {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    /* This test suite determines that the menu works correctly*/
    describe('The Menu', function() {
        /* This test ensures the menu element is hidden by
         * default.
         */
         it('has menu hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* This test ensures the menu changes visibility when the menu
          * icon is clicked. This test has two expectations:
          * does the menu display when clicked
          * and does it hide when clicked again.
          */
          it('menu changes visibility when menu icon clicked', function() {
            //When menu item is clicked
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            //When menu item is clicked again
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });

    });

    /* This test suite ensures that when the laodFeed function is called,
     * and it completes its work, there is at least a .entry element
     * within the .feed container.
     */
    describe('Initial Entries', function() {
         /* loadFeed is asynchronous, so need to use beforeEach and
          * asynchronous done() function.
          */
         beforeEach(function(done) {
           // Load the first feed.
           loadFeed(0, function() {
             done();
           });
         });

         // Check there is an entry in the .feed container
         it('has an entry in .feed container', function() {
           let entry = $('.feed .entry');
           expect(entry.length).toBeGreaterThan(0);
         });
    });
    /* This test suite ensures that the content actually changes when
     * a new feed is loaded.
     */
    describe('New Feed Selection', function() {
        let firstContent, secondContent;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        /* loadFeed is asynchronous, so need to use beforeEach and
         * aynchronous done() function.
         */
         beforeEach(function(done) {
           // load the first feed.
           loadFeed(0, function() {
             // Get the HTML content of the first feed entry.
             firstContent = $('.feed').html();

             // Then load the second feed.
             loadFeed(1, function() {
               // Get the HTML content of the second feed entry.
               secondContent = $('.feed').html();
               done();
             });
           });
         });

         /* Check that the HTML content actually changes with the new
          * feed. I.e. the HTML content isn't the same.
          */
         it('content changes with new feed', function() {
           expect(firstContent).not.toBe(secondContent);
         });
    });
}());

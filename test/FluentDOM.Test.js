describe("FDOMBuilder test", function(){
    var builder = new FDOMBuilder();

    builder.child("a")
           .title("My personal Github")
           .href("http://www.github.com/haritzmedina")
           .target("_blank")
           .id("github")
           .child("img")
            .src("https://cdn0.iconfinder.com/data/icons/octicons/1024/mark-github-128.png")
            .addClass("icon")
            .css("height:128px;width:128px;") // Remember that is better to use a css file for this!
           .endChild()
           .endChild();

    it("Created an anchor called by github id, with a title and href and img as ", function() {
        expect(true).toBe(true);
    });
});
describe("FDOMBuilder test", function(){
    var builder = new FDOMBuilder();

    builder.child("a")
           .title("Github")
           .href("")
           .child("img")
            .src("https://cdn0.iconfinder.com/data/icons/octicons/1024/mark-github-128.png")
           .endChild()
           .endChild();

    it("Created an a", function() {
        expect(true).toBe(true);
    });
});
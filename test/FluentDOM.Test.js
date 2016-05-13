/*import describe from 'jasmine-core';
import beforeAll from 'jasmine-core';
import it from 'jasmine-core';
import expect from 'jasmine-core';
import FDOMBuilder from 'src/FDOMBuilder';*/

describe('FDOMBuilder test', function(){

	var builder;

	beforeAll(function(){
		builder = new FDOMBuilder();

		builder.child('a')
			.title('My personal Github')
			.href('http://www.github.com/haritzmedina')
			.target('_blank')
			.id('github')
			.child('img')
				.src('https://cdn0.iconfinder.com/data/icons/octicons/1024/mark-github-128.png')
				.addClass('icon')
				.css('height:128px;width:128px;') // Remember that is better to use a css file for this!
			.endChild()
		.endChild();
	});

	it('A link to github is created with an img as a child', function() {
		var link = document.getElementById('github');
		var img = link.childNodes[0];
		var name = img.tagName;
		expect(name).toBe('IMG');
	});

	it('Check all childs are ended', function(){
		expect(builder._currentElement).toBe(builder._rootElement);
	});
});
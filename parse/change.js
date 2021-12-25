const post = {
  title: 'My Super Post',
  header: /*html*/ `
	<div class="header">
		<p>1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet commodo nisl.</p>
	</div>
	`,
  body: /*html*/ `
	<div class="body">
		<p>2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet commodo nisl.</p>
	</div>
	`,
  footer: /*html*/ `
	<div class="body">
		<p>3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet commodo nisl.</p>
	</div>
	`,
};

const toFullContent = (post) => {
  return /*html*/ `
		<h1>${post.title}</h1>

		<div class="content">
			${post.html}
		</div>
	`;
};

console.log(toFullContent(post));

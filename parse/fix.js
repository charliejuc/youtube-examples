const post = {
  title: 'My Super Post',
  header: /*html*/ `<div class="header">
		<p>1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet commodo nisl. Aenean non iaculis leo. Cras aliquet leo eu nisl commodo ultrices. Fusce sodales eleifend enim, eu tincidunt quam scelerisque et. Vestibulum feugiat egestas tempor. Nam rhoncus lacinia sollicitudin. Curabitur posuere lobortis erat ac faucibus. Nam augue diam, viverra non hendrerit facilisis, iaculis at sapien. Sed nulla massa, volutpat eu neque quis, interdum hendrerit eros.1</p>
	</div>`,
  body: /*html*/ `<div class="body">
		<p>2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet commodo nisl. Aenean non iaculis leo. Cras aliquet leo eu nisl commodo ultrices. Fusce sodales eleifend enim, eu tincidunt quam scelerisque et. Vestibulum feugiat egestas tempor. Nam rhoncus lacinia sollicitudin. Curabitur posuere lobortis erat ac faucibus. Nam augue diam, viverra non hendrerit facilisis, iaculis at sapien. Sed nulla massa, volutpat eu neque quis, interdum hendrerit eros.2</p>
	</div>`,
  footer: /*html*/ `<div class="body">
		<p>3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet commodo nisl. Aenean non iaculis leo. Cras aliquet leo eu nisl commodo ultrices. Fusce sodales eleifend enim, eu tincidunt quam scelerisque et. Vestibulum feugiat egestas tempor. Nam rhoncus lacinia sollicitudin. Curabitur posuere lobortis erat ac faucibus. Nam augue diam, viverra non hendrerit facilisis, iaculis at sapien. Sed nulla massa, volutpat eu neque quis, interdum hendrerit eros.3</p>
	</div>`,
};

const parsePost = (post) => ({
  ...post,
  html: `
	${post.header}
	${post.body}
	${post.footer}
	`,
});

const toFullContent = (post) => {
  return /*html*/ `
		<h1>${post.title}</h1>

		<div class="content">
			${post.html}
		</div>
	`;
};

console.log(toFullContent(parsePost(post)));

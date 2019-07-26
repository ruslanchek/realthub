import { useRouter } from 'next/router';

const Post = () => {
	const router = useRouter();
	const { id } = router.query;

	return <p>My Id: {id}</p>;
};

export default Post;

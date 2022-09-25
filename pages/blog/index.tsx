import Image from "next/image";
import Layout from "../../components/Layout";
import ApolloClient, { gql } from "apollo-boost";
import Link from "next/link";
interface BlogProps {
    title: string;
    creationDate: string;
}

const Blog = ({ title, creationDate }: BlogProps) => {
    // create a function that parses a string representation of a date  and returns the month and year
    const parseDate = (date: string) => {
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString("default", { month: "long" });
        const year = dateObj.getFullYear();
        return `${month} ${year}`;
    };

    return (
        <Link href={"blog/" + encodeURIComponent(title)} passHref>
            <div className="cursor-pointer">
                <h2 className="text-2xl">{title}</h2>
                <p className="text-gray-500">{parseDate(creationDate)}</p>
            </div>
        </Link>
    );
};
interface HomeProps {
    blogs: Array<BlogProps>;
}
const Home = ({ blogs }: HomeProps) => {
    return (
        <Layout>
            <div className="w-4/5 max-w-6xl mx-auto mt-40 ">
                <h1 className="text-4xl font-bold font-oxygen text-base-blurple dark:text-blue-light">
                    Blogs
                </h1>
                <div className="flex gap-8 flex-wrap mt-4 flex-col">
                    {blogs.map((bl) => (
                        <Blog
                            title={bl.title}
                            creationDate={bl.creationDate}
                            key={bl.title}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
interface BlogGraphQL {
    title: string;

    creationDate: string;
}

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "https://graphql.contentful.com/content/v1/spaces/jxkpl93ucbhf",
        headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
        },
    });
    const { data } = await client.query({
        query: gql`
            {
                blogPostCollection(preview: false) {
                    items {
                        title
                        creationDate
                    }
                }
            }
        `,
    });
    const blog = data.blogPostCollection.items;
    const blogData = blog.map((b: any) => {
        let temp = Object.assign({}, b);
        if (temp.thumbnail) {
            temp.thumbnail = temp.thumbnail.url;
        }
        return temp;
    });
    return {
        props: {
            blogs: blogData,
        },
    };
}

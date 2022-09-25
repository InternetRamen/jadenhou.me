import Image from "next/image";
import Layout from "../../components/Layout";
import ApolloClient, { gql } from "apollo-boost";
import Link from "next/link"
interface ProjectProps {
    title: string;
    description: string;
    creationDate: string;
    thumbnail?: string;
}

const Project = ({
    title,
    description,
    creationDate,
    thumbnail,
}: ProjectProps) => {
    // create a function that parses a string representation of a date  and returns the month and year
    const parseDate = (date: string) => {
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString("default", { month: "long" });
        const year = dateObj.getFullYear();
        return `${month} ${year}`;
    };

    return (
        <Link href={"project/" + encodeURIComponent(title)}>
            <div className="flex flex-col border-4 border-blue-dark rounded-md w-96 dark:border-white cursor-pointer transition-all duration-200 ease hover:bg-blue-dark hover:text-white hover:dark:bg-base-light hover:dark:text-base-dark ">
                {thumbnail ? (
                    <Image
                        src={thumbnail}
                        alt={title}
                        width="400"
                        height="255"
                        objectFit="cover"
                    />
                ) : (
                    <></>
                )}
                <div className="p-4">
                    <a className="text-2xl font-oxygen font-bold">{title}</a>
                    <p className="font-inter">{description}</p>
                    <p className="text-slate-500 font-inter">
                        {parseDate(creationDate)}
                    </p>
                </div>
            </div>
        </Link>
    );
};
interface HomeProps {
    projects: Array<ProjectProps>;
}
const Home = ({ projects }: HomeProps) => {
    return (
        <Layout>
            <div className="w-4/5 max-w-6xl mx-auto mt-40 ">
                <h1 className="text-4xl font-bold font-oxygen text-base-blurple dark:text-blue-light">
                    Projects
                </h1>
                <div className="flex gap-8 flex-wrap mt-4">
                    {projects.map((pr) => (
                        <Project
                            title={pr.title}
                            description={pr.description}
                            creationDate={pr.creationDate}
                            thumbnail={pr.thumbnail}
                            key={pr.title}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
interface ProjectGraphQL {
    title: string;
    description: string;
    creationDate: string;
    thumbnail?: {
        url: string;
    };
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
                projectCollection(preview: false) {
                    items {
                        title
                        description
                        creationDate
                        thumbnail {
                            url
                        }
                    }
                }
            }
        `,
    });
    const project = data.projectCollection.items;
    const projectData = project.map((project: any) => {
        let temp = Object.assign({}, project);
        if (temp.thumbnail) {
            temp.thumbnail = temp.thumbnail.url;
        }
        return temp;
    });
    console.log(projectData);
    return {
        props: {
            projects: projectData,
        },
    };
}

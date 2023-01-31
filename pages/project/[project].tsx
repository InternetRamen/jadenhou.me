import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { AssetLinkBlock, BLOCKS, Document } from "@contentful/rich-text-types";
import ApolloClient, { gql } from "apollo-boost";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiArrowLeftBottom, mdiArrowRight } from "@mdi/js";
interface ProjectProps {
    project: {
        title: string;
        description: string;
        body: Document;
        creationDate: Date;
        thumbnail?: string;
        tags: Array<string>;
        links: Array<string>;
        bodyLinks: Array<{
            title: string;
            url: string;
            sys: {
                id: string;
            };
            width: number;
            height: number;
        }>;
    };
}

const Project = ({ project }: ProjectProps) => {
    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node: AssetLinkBlock) => {
                let img = project.bodyLinks.find(
                    (i) => i.sys.id === node.data.target.sys.id
                );
                if (!img)
                    img = {
                        url: "",
                        title: "",
                        sys: { id: "" },
                        width: 0,
                        height: 0,
                    };
                return (
                    <div className="max-w-3xl">
                        <Image
                            src={img.url}
                            alt={img.title}
                            width={img.width}
                            height={img.height}
                            objectFit="cover"
                        />
                    </div>
                );
            },
        },
    };
    return (
        <>
            <Layout>
                <div className="max-w-3xl w-4/5 mt-40 mx-auto font-inter">
                    <div className="dark:text-blue-200  text-blue-500 relative w-fit text-xl hover:after:w-full hover:after:h-[0.1rem] hover:after:dark:bg-blue-200 hover:after:bg-blue-500 hover:after:absolute hover:after:bottom-0 cursor-pointer ">
                        <Link href="/project" passHref>
                            <a className="flex items-center gap-2">
                                <Icon path={mdiArrowLeft} size={1} />
                                Go back
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-col mt-4">
                        <h1 className="text-4xl">{project.title}</h1>
                        <div className="gap-3 mt-2 flex flex-wrap">
                            {project.tags
                                ? project.tags.map((tag, key) => (
                                      <p
                                          key={key}
                                          className="bg-base-blurple text-base-light py-1 text-sm px-2 rounded "
                                      >
                                          {tag}
                                      </p>
                                  ))
                                : null}
                        </div>
                        <p className="text-md mt-4">
                            {
                                // @ts-ignore
                                documentToReactComponents(project.body, options)
                            }
                        </p>
                        <div className="gap-3 mt-2 flex flex-wrap flex-col">
                            <h1 className="text-2xl">Links</h1>
                            <ul>
                                {project.links &&
                                    project.links.map((link, key) => (
                                        <li key={key}>
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Project;

type Params = {
    project: string;
};
export async function getStaticProps({ params }: { params: Params }) {
    console.log(params.project);
    const client = new ApolloClient({
        uri: "https://graphql.contentful.com/content/v1/spaces/jxkpl93ucbhf",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
        },
    });

    const { data } = await client.query({
        query: gql`
            query getProjectData($project: String!) {
                projectCollection(where: { title: $project }, limit: 1) {
                    items {
                        title
                        description
                        body {
                            json
                            links {
                                assets {
                                    block {
                                        title
                                        url
                                        sys {
                                            id
                                        }
                                        width
                                        height
                                    }
                                }
                            }
                        }
                        creationDate
                        thumbnail {
                            url
                        }
                        tags
                        links
                    }
                }
            }
        `,
        variables: {
            project: params.project,
        },
    });

    const project = data.projectCollection.items[0];
    project.bodyLinks = project.body.links.assets.block;
    project.body = project.body.json;
    project.thumbnail = project.thumbnail.url;

    return {
        props: {
            project: project,
        },
        revalidate: 10,
    };
}
export async function getStaticPaths() {
    const client = new ApolloClient({
        uri: "https://graphql.contentful.com/content/v1/spaces/jxkpl93ucbhf",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
        },
    });

    const data = await client.query({
        query: gql`
            query GetText {
                projectCollection(preview: false) {
                    items {
                        title
                    }
                }
            }
        `,
    });

    const d = data.data.projectCollection.items.map(
        (item: { title: string }) => item.title
    );

    return {
        paths: d.map((val: string) => {
            return { params: { project: val } };
        }),
        fallback: false,
    };
}

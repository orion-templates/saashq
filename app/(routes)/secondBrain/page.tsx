import { DataTable } from "@/components/ui/data-table";
import Container from "../components/ui/Container";
import { getNotions } from "@/actions/get-notions";
import { columns } from "./table-components/columns";
import Link from "next/link";
import H4Title from "@/components/typography/h4";

import NewTask from "./components/NewTask";
import { getUsers } from "@/actions/get-users";
import { getBoards } from "@/actions/projects/get-boards";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SecondBrainDataTable } from "./table-components/data-table";

type Props = {};

const SecondBrainPage = async (props: Props) => {
  const notions: any = await getNotions();
  const users: any = await getUsers();
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const boards: any = await getBoards(userId!);

  if (!notions || notions.error) {
    return (
      <div>
        <H4Title>
          Notions are not enabled. Please enable it in your profile
        </H4Title>

        <div>
          Here is how to enable it:
          <ol>1. Register and login to Notion.so</ol>
          <ol>
            2. Create (Click on duplicate) new database from this source -{" "}
            <Link href="http://abdulhadeahmad.notion.site/87bfd5b5862e425d82de6ce47c88a2d4">
              http://abdulhadeahmad.notion.site/87bfd5b5862e425d82de6ce47c88a2d4
            </Link>
          </ol>
          <ol>
            3. Create SaasHQ integration in Notion (
            <a href="https://www.notion.so/my-integrations">
              https://www.notion.so/my-integrations
            </a>
            ) and connect new integration with your database by click on ...
            (three dots on top right corner of database), find your newly
            created integration and click on it
          </ol>
          <ol>4. Copy integration token</ol>
          <ol>
            5. Paste integration token to your{" "}
            <Link href={"/profile"} className="text-blue-500">
              profile
            </Link>
          </ol>
          <ol>
            6. Copy Notion DB ID (it is first string in URL it is red in
            example) - (https://www.notion.so/
            <span className="text-red-500">
              2e5524886ae743ae8c2e47b9a39df133
            </span>
            ?v=e563b6c36b6649bba29eaad6b4c52ab4)
          </ol>
          <Link href="/profile" className="my-button-v2">
            Enable Second Brain
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <NewTask users={users} boards={boards} />
      <Container
        title="Second Brain"
        description={"Everything you need to know about Your notions"}
      >
        <SecondBrainDataTable columns={columns} data={notions} />
      </Container>
    </>
  );
};

export default SecondBrainPage;

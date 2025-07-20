import Header from "@/components/header";
import HomeActions from "@/components/home-actions";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Home = async () => {
  const user = await getCurrentUser();

  return (
    <main className="">
      <div className="min-h-screen bg-gray-100">
        <Header user={user ?? null} />
        <main className="container mx-auto p-4 space-y-6">
          {/* <Card>
            <CardHeader>
              <CardTitle>Welcome to Talk</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                {session?.user
                  ? "Start a new meeting or join an existing one to connect with your team."
                  : "Sign in to create or join meetings and collaborate seamlessly."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <ClientClock />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <HomeActions isAuthenticated={!!session} />
            </CardContent>
          </Card> */}

          <HomeActions isAuthenticated={!!user} />
        </main>
      </div>
    </main>
  );
};

export default Home;

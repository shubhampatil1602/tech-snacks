import { requireAdmin } from "@/actions/user";
import {
  getActiveWindow,
  getTodaysWindows,
} from "@/modules/order-window/queries";
import { prisma } from "@/lib/db";
import { ActiveWindowCard } from "./_components/ActiveWindowCard";
import { CreateWindowForm } from "./_components/CreateWindowForm";
import { TodaysWindowsList } from "./_components/TodaysWindowsList";

export default async function AdminOrdersPage() {
  const { session } = await requireAdmin();

  const member = await prisma.member.findFirst({
    where: { userId: session.user.id },
  });

  const [activeWindow, todaysWindows] = member
    ? await Promise.all([
        getActiveWindow(member.organizationId),
        getTodaysWindows(member.organizationId),
      ])
    : [null, []];

  return (
    <div className='px-4 space-y-6'>
      <div>
        <h1 className='text-2xl font-heading tracking-wide'>Orders</h1>
        <p className='text-sm text-muted-foreground mt-1'>
          Manage order windows and live orders
        </p>
      </div>

      {/* active window or create form */}
      {activeWindow ? (
        <ActiveWindowCard window={activeWindow} />
      ) : (
        <CreateWindowForm />
      )}

      {/* today's windows */}
      <TodaysWindowsList windows={todaysWindows} />
    </div>
  );
}

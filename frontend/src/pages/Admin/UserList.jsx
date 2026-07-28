import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import AdminShell from "./AdminShell";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";

const IconButton = ({ label, onClick, tone = "default", children }) => (
  <button
    onClick={onClick}
    aria-label={label}
    title={label}
    className={`grid h-8 w-8 place-items-center rounded-md transition-colors ${
      tone === "danger"
        ? "text-ink-faint hover:bg-rust/10 hover:text-rust"
        : "text-ink-faint hover:bg-sand-200 hover:text-ink"
    }`}
  >
    {children}
  </button>
);

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="m5 13 4 4L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this customer? This cannot be undone.")) return;
    try {
      await deleteUser(id);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username || "");
    setEditableUserEmail(email || "");
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
      toast.success("Customer updated");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <AdminShell
      title="Customers"
      subtitle={
        users ? `${users.length} registered account${users.length === 1 ? "" : "s"}` : undefined
      }
    >
      {isLoading ? (
        <Loader label="Loading customers" />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-sand-400 bg-sand-50">
          <table className="w-full min-w-[42rem] text-left">
            <thead>
              <tr className="border-b border-sand-400">
                {["Name", "Email", "Role", "ID", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-label text-ink-faint"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-sand-300">
              {users.map((user) => {
                const editing = editableUserId === user._id;

                return (
                  <tr
                    key={user._id}
                    className="transition-colors hover:bg-sand-100"
                  >
                    <td className="px-4 py-3">
                      {editing ? (
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="field py-1.5 text-[14px]"
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-clay-100 text-[12px] font-bold text-clay-600">
                            {user.username?.[0]?.toUpperCase() || "?"}
                          </span>
                          <span className="text-[15px]">{user.username}</span>
                          <IconButton
                            label="Edit name"
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {editing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="field py-1.5 text-[14px]"
                          />
                          <IconButton
                            label="Save"
                            onClick={() => updateHandler(user._id)}
                          >
                            <CheckIcon />
                          </IconButton>
                        </div>
                      ) : (
                        <a
                          href={`mailto:${user.email}`}
                          className="text-[14px] text-ink-soft transition-colors hover:text-clay-500"
                        >
                          {user.email}
                        </a>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`pill ${
                          user.isAdmin
                            ? "bg-clay-50 text-clay-600"
                            : "bg-sand-200 text-ink-soft"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "Customer"}
                      </span>
                    </td>

                    <td className="max-w-[9rem] truncate px-4 py-3 text-[12px] text-ink-faint tnum">
                      {user._id}
                    </td>

                    <td className="px-4 py-3 text-right">
                      {!user.isAdmin && (
                        <IconButton
                          label="Delete customer"
                          tone="danger"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <TrashIcon />
                        </IconButton>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
};

export default UserList;

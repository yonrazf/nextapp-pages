"use client";
import { useCallback, useState } from "react";
import {
  useAuth,
  AdminPortal,
  useAuthActions,
  useTenantsState,
  useTenantsActions,
} from "@frontegg/nextjs";
import { useRouter } from "next/router";

export default function MyPage() {
  const { user, isAuthenticated } = useAuth();
  const { tenants, activeTenant } = useTenantsState();
  const [selectedTenant, setSelectedTenant] = useState(activeTenant);
  const { switchTenant } = useTenantsActions();

  const router = useRouter();

  const logout = useCallback(() => {
    router.replace("/account/logout");
  }, [router]);

  const handleTenantSwitch = () => {
    if (selectedTenant && selectedTenant?.tenantId === activeTenant?.tenantId)
      return;
    switchTenant({ tenantId: selectedTenant!.tenantId });
  };

  return isAuthenticated ? (
    <div>
      <h1 className="font-extrabold text-3xl">My Page</h1>
      <img src={user?.profilePictureUrl ?? ""} alt="user pfp" />
      <div>
        <span>Logged in as: {user?.name}</span>
      </div>
      <div>
        <span>Active Tenant: {activeTenant?.name}</span>
      </div>
      <div>
        <select
          className=" p-1 rounded-sm mr-1  border-slate-200 border-2"
          value={selectedTenant?.tenantId}
          onChange={(e) =>
            setSelectedTenant(
              (prev) =>
                tenants.find((t) => t.tenantId === e.target.value) ?? prev
            )
          }
        >
          {tenants.map((tenant) => (
            <option value={tenant.tenantId}>{tenant.name}</option>
          ))}
        </select>
        <button onClick={handleTenantSwitch}>Switch Tenant</button>
      </div>
      <div>
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  ) : (
    <button onClick={() => router.push("/account/login")}>Log in</button>
  );
}
